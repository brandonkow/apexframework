import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile, rm, mkdtemp, writeFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

async function freePort() {
  const probe = net.createServer();
  await new Promise((resolve, reject) => {
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", resolve);
  });
  const address = probe.address();
  await new Promise((resolve) => probe.close(resolve));
  return address.port;
}

async function waitForHealth(baseUrl, child) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Test server exited with code ${child.exitCode}.`);
    try {
      const response = await fetch(`${baseUrl}/api/health`);
      if (response.ok) return;
    } catch {
      // Server startup is still in progress.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Test server did not become ready.");
}

function cookieFrom(response) {
  return String(response.headers.get("set-cookie") || "").split(";")[0];
}

async function jsonRequest(baseUrl, pathname, { method = "GET", cookie = "", clientId = "test-client-0001", body } = {}) {
  const headers = { "x-estatelab-client-id": clientId };
  if (cookie) headers.cookie = cookie;
  if (body !== undefined) headers["content-type"] = "application/json";
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body)
  });
  const payload = response.status === 204 ? null : await response.json();
  return { response, payload };
}

test("accounts protect user sessions while guests remain device-scoped", async (t) => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), "estatelab-auth-"));
  await writeFile(path.join(dataDir, "db.json"), JSON.stringify({
    properties: [],
    comps: [],
    brain: { answers: [], beliefs: [], decisions: [] },
    jarvis: {
      sessions: [{
        id: "legacy-session",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
        title: "Legacy guest chat",
        clientId: "legacy-client",
        messages: []
      }]
    }
  }, null, 2));
  const port = await freePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, [path.join(repoDir, "server.js")], {
    cwd: repoDir,
    env: {
      ...process.env,
      PORT: String(port),
      ESTATELAB_DATA_DIR: dataDir,
      OPENAI_API_KEY: ""
    },
    stdio: "ignore"
  });

  t.after(async () => {
    if (child.exitCode === null) {
      child.kill();
      await new Promise((resolve) => child.once("exit", resolve));
    }
    await rm(dataDir, { recursive: true, force: true });
  });

  await waitForHealth(baseUrl, child);

  const invalidGuest = await jsonRequest(baseUrl, "/api/jarvis/sessions", {
    method: "POST",
    clientId: "short",
    body: {}
  });
  assert.equal(invalidGuest.response.status, 400);

  const guest = await jsonRequest(baseUrl, "/api/jarvis/sessions", {
    method: "POST",
    clientId: "guest-device-a-0001",
    body: {}
  });
  assert.equal(guest.response.status, 201);
  const guestId = guest.payload.session.id;

  const wrongGuest = await jsonRequest(baseUrl, `/api/jarvis/sessions/${guestId}`, { clientId: "guest-device-b-0002" });
  assert.equal(wrongGuest.response.status, 404);
  const correctGuest = await jsonRequest(baseUrl, `/api/jarvis/sessions/${guestId}`, { clientId: "guest-device-a-0001" });
  assert.equal(correctGuest.response.status, 200);
  const wrongGuestHistory = await jsonRequest(baseUrl, "/api/jarvis/sessions", { clientId: "guest-device-b-0002" });
  assert.deepEqual(wrongGuestHistory.payload.sessions, []);

  const registration = await jsonRequest(baseUrl, "/api/auth/register", {
    method: "POST",
    clientId: "member-device-0001",
    body: {
      displayName: "EstateLab Member",
      email: "member@example.com",
      password: "correct-horse-battery"
    }
  });
  assert.equal(registration.response.status, 201);
  assert.equal(registration.payload.user.email, "member@example.com");
  const cookie = cookieFrom(registration.response);
  assert.match(cookie, /^estatelab_session=/);
  assert.match(registration.response.headers.get("set-cookie"), /HttpOnly/);
  assert.match(registration.response.headers.get("set-cookie"), /SameSite=Strict/);

  const memberSession = await jsonRequest(baseUrl, "/api/jarvis/sessions", {
    method: "POST",
    cookie,
    clientId: "member-device-0001",
    body: {}
  });
  assert.equal(memberSession.response.status, 201);
  const memberSessionId = memberSession.payload.session.id;

  const memberWithoutCookie = await jsonRequest(baseUrl, `/api/jarvis/sessions/${memberSessionId}`, {
    clientId: "member-device-0001"
  });
  assert.equal(memberWithoutCookie.response.status, 404);
  const memberWithCookie = await jsonRequest(baseUrl, `/api/jarvis/sessions/${memberSessionId}`, {
    cookie,
    clientId: "different-device-0001"
  });
  assert.equal(memberWithCookie.response.status, 200);
  const memberHistory = await jsonRequest(baseUrl, "/api/jarvis/sessions", {
    cookie,
    clientId: "another-device-0001"
  });
  assert.equal(memberHistory.response.status, 200);
  assert.equal(memberHistory.payload.sessions[0].id, memberSessionId);

  const me = await jsonRequest(baseUrl, "/api/auth/me", { cookie, clientId: "member-device-0001" });
  assert.equal(me.payload.authenticated, true);
  assert.equal(me.payload.user.displayName, "EstateLab Member");

  const db = JSON.parse(await readFile(path.join(dataDir, "db.json"), "utf8"));
  assert.equal(db.auth.version, 5);
  assert.equal(db.auth.users[0].role, "member");
  assert.ok(!db.jarvis.sessions.some((session) => session.id === "legacy-session"));
  assert.notEqual(db.auth.users[0].passwordHash, "correct-horse-battery");
  assert.match(db.auth.users[0].passwordHash, /^scrypt\$/);
  assert.ok(!JSON.stringify(db.auth.sessions).includes(cookie.split("=")[1]));

  const logout = await jsonRequest(baseUrl, "/api/auth/logout", {
    method: "POST",
    cookie,
    clientId: "member-device-0001",
    body: {}
  });
  assert.equal(logout.response.status, 200);
  const meAfterLogout = await jsonRequest(baseUrl, "/api/auth/me", { cookie, clientId: "member-device-0001" });
  assert.equal(meAfterLogout.payload.authenticated, false);

  const login = await jsonRequest(baseUrl, "/api/auth/login", {
    method: "POST",
    clientId: "new-device-0000001",
    body: {
      email: "member@example.com",
      password: "correct-horse-battery"
    }
  });
  assert.equal(login.response.status, 200);
  const newDeviceCookie = cookieFrom(login.response);
  const resumedHistory = await jsonRequest(baseUrl, "/api/jarvis/sessions", {
    cookie: newDeviceCookie,
    clientId: "new-device-0000001"
  });
  assert.equal(resumedHistory.payload.sessions[0].id, memberSessionId);
});
