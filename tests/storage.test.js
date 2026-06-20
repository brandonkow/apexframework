import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { JsonStateStore, PostgresStateStore, StorageConflictError } from "../storage.js";

function compactSql(sql) {
  return String(sql).replace(/\s+/g, " ").trim();
}

class FakeClient {
  constructor(handler = () => ({ rows: [] })) {
    this.handler = handler;
    this.calls = [];
    this.released = false;
  }

  async query(sql, params = []) {
    const text = compactSql(sql);
    this.calls.push({ text, params });
    return this.handler(text, params);
  }

  release() {
    this.released = true;
  }
}

class FakePool {
  constructor(client) {
    this.client = client;
  }

  async connect() {
    return this.client;
  }

  async end() {}
}

function sampleState(revision = 0) {
  return {
    properties: [{ id: "property-1" }],
    comps: [{ id: "comp-1" }],
    brain: { answers: [], beliefs: [], decisions: [] },
    auth: {
      version: 1,
      users: [{
        id: "user-1",
        email: "member@example.com",
        displayName: "Member",
        passwordHash: "scrypt$salt$hash",
        createdAt: "2026-01-01T00:00:00.000Z"
      }],
      sessions: [{
        tokenHash: "token-hash",
        userId: "user-1",
        createdAt: "2026-01-01T00:00:00.000Z",
        expiresAt: "2030-01-01T00:00:00.000Z"
      }]
    },
    jarvis: {
      sessions: [{
        id: "jarvis-1",
        userId: "user-1",
        clientId: "device-1",
        title: "Test conversation",
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:01:00.000Z",
        messages: [{
          id: "message-1",
          role: "user",
          content: "Hello",
          createdAt: "2026-01-01T00:01:00.000Z",
          sources: []
        }]
      }]
    },
    _storageRevision: revision
  };
}

test("JSON store remains a working local fallback", async (t) => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "estatelab-json-store-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const store = new JsonStateStore(path.join(directory, "db.json"));
  await store.init(sampleState());
  const initial = await store.read();
  assert.equal(initial.properties[0].id, "property-1");
  initial.properties.push({ id: "property-2" });
  await store.write(initial);
  const updated = await store.read();
  assert.equal(updated.properties.length, 2);
});

test("PostgreSQL store writes normalized state inside one transaction", async () => {
  const client = new FakeClient((text) => {
    if (text.includes("SELECT revision") && text.includes("FOR UPDATE")) return { rows: [{ revision: "0" }] };
    return { rows: [] };
  });
  const store = new PostgresStateStore(new FakePool(client));
  await store.write(sampleState(0));

  assert.equal(client.calls[0].text, "BEGIN");
  assert.equal(client.calls.at(-1).text, "COMMIT");
  assert.ok(client.calls.some((call) => call.text.includes("INSERT INTO estatelab_users")));
  assert.ok(client.calls.some((call) => call.text.includes("INSERT INTO estatelab_auth_sessions")));
  assert.ok(client.calls.some((call) => call.text.includes("INSERT INTO estatelab_jarvis_sessions")));
  assert.ok(client.calls.some((call) => call.text.includes("INSERT INTO estatelab_jarvis_messages")));
  const coreWrite = client.calls.find((call) => call.text.includes("INSERT INTO estatelab_core"));
  assert.equal(typeof coreWrite.params[0], "string");
  assert.deepEqual(JSON.parse(coreWrite.params[0]), [{ id: "property-1" }]);
  assert.equal(client.released, true);
});

test("PostgreSQL store creates schema and imports the seed once", async () => {
  const client = new FakeClient((text) => {
    if (text === "SELECT singleton FROM estatelab_core WHERE singleton = TRUE") return { rows: [] };
    return { rows: [] };
  });
  const store = new PostgresStateStore(new FakePool(client));
  await store.init(sampleState());
  assert.equal(client.calls[0].text, "BEGIN");
  assert.ok(client.calls.some((call) => call.text.includes("CREATE TABLE IF NOT EXISTS estatelab_users")));
  assert.ok(client.calls.some((call) => call.text.includes("INSERT INTO estatelab_core")));
  assert.ok(client.calls.some((call) => call.text.includes("UPDATE estatelab_meta SET revision = 1")));
  assert.equal(client.calls.at(-1).text, "COMMIT");
});

test("PostgreSQL store rolls back stale writes", async () => {
  const client = new FakeClient((text) => {
    if (text.includes("SELECT revision") && text.includes("FOR UPDATE")) return { rows: [{ revision: "2" }] };
    return { rows: [] };
  });
  const store = new PostgresStateStore(new FakePool(client));
  await assert.rejects(() => store.write(sampleState(1)), StorageConflictError);
  assert.ok(client.calls.some((call) => call.text === "ROLLBACK"));
  assert.ok(!client.calls.some((call) => call.text === "COMMIT"));
});

test("PostgreSQL store reconstructs users, sessions, and ordered messages", async () => {
  const client = new FakeClient((text) => {
    if (text === "SELECT revision FROM estatelab_meta WHERE singleton = TRUE") return { rows: [{ revision: "7" }] };
    if (text.startsWith("SELECT properties, comps, brain")) {
      return { rows: [{ properties: [{ id: "p" }], comps: [], brain: { beliefs: [] } }] };
    }
    if (text.startsWith("SELECT id, email, display_name")) {
      return { rows: [{ id: "u", email: "u@example.com", display_name: "User", password_hash: "hash", created_at: new Date("2026-01-01T00:00:00.000Z") }] };
    }
    if (text.startsWith("SELECT token_hash, user_id")) {
      return { rows: [{ token_hash: "t", user_id: "u", created_at: new Date("2026-01-01T00:00:00.000Z"), expires_at: new Date("2030-01-01T00:00:00.000Z") }] };
    }
    if (text.startsWith("SELECT id, user_id, client_id")) {
      return { rows: [{ id: "s", user_id: "u", client_id: "c", title: "Title", created_at: new Date("2026-01-01T00:00:00.000Z"), updated_at: new Date("2026-01-01T00:01:00.000Z") }] };
    }
    if (text.startsWith("SELECT id, session_id, position")) {
      return { rows: [{ id: "m", session_id: "s", position: 0, role: "user", content: "Hi", created_at: new Date("2026-01-01T00:01:00.000Z"), sources: [] }] };
    }
    return { rows: [] };
  });
  const store = new PostgresStateStore(new FakePool(client));
  const state = await store.read();
  assert.equal(state._storageRevision, 7);
  assert.equal(state.auth.users[0].displayName, "User");
  assert.equal(state.jarvis.sessions[0].messages[0].content, "Hi");
  assert.equal(client.calls[0].text, "BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY");
  assert.equal(client.calls.at(-1).text, "COMMIT");
});
