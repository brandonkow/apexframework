import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createObjectStore, LocalObjectStore, SupabaseObjectStore } from "../object-storage.js";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

test("local object storage sanitizes paths and removes document folders", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "apex-objects-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const store = new LocalObjectStore(root);
  await store.init();
  const key = await store.store("document-1", "../../agent notes.md", Buffer.from("evidence"));
  assert.equal(key, "document-1/agent-notes.md");
  assert.equal(await readFile(path.join(root, key), "utf8"), "evidence");
  await store.remove("document-1", key);
  await assert.rejects(() => access(path.join(root, "document-1")));
});

test("Supabase object storage verifies a private bucket and preserves upload metadata", async () => {
  const requests = [];
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url, options });
    if (options.method === "POST") return jsonResponse({ Key: "document-1/agent-notes.md" });
    if (options.method === "DELETE") return jsonResponse([]);
    return jsonResponse({ id: "jarvis-evidence", public: false });
  };
  const store = new SupabaseObjectStore({
    url: "https://project.supabase.co",
    serviceRoleKey: "service-role-test-key",
    bucket: "jarvis-evidence",
    fetchImpl
  });
  await store.init();
  const key = await store.store("document-1", "agent notes.md", Buffer.from("evidence"), {
    contentType: "text/markdown"
  });
  await store.remove("document-1", key);

  assert.equal(key, "document-1/agent-notes.md");
  assert.match(requests[0].url, /\/storage\/v1\/bucket\/jarvis-evidence$/);
  assert.match(requests[1].url, /\/storage\/v1\/object\/jarvis-evidence\/document-1\/agent-notes\.md$/);
  assert.equal(requests[1].options.headers["Content-Type"], "text/markdown");
  assert.equal(requests[1].options.headers["x-upsert"], "false");
  assert.equal(requests[1].options.headers.apikey, "service-role-test-key");
  assert.equal(requests[1].options.headers.Authorization, "Bearer service-role-test-key");
  assert.equal(Buffer.from(requests[1].options.body).toString("utf8"), "evidence");
  assert.deepEqual(JSON.parse(requests[2].options.body), { prefixes: ["document-1/agent-notes.md"] });
});

test("Supabase object storage can discover and remove a document prefix", async () => {
  const requests = [];
  const fetchImpl = async (url, options = {}) => {
    requests.push({ url, options });
    if (url.includes("/object/list/")) return jsonResponse([{ name: "one.txt" }, { name: "document-2/two.txt" }]);
    return jsonResponse([]);
  };
  const store = new SupabaseObjectStore({
    url: "https://project.supabase.co",
    serviceRoleKey: "service-role-test-key",
    bucket: "jarvis-evidence",
    fetchImpl
  });
  await store.remove("document-2");
  assert.deepEqual(JSON.parse(requests[1].options.body), {
    prefixes: ["document-2/one.txt", "document-2/two.txt"]
  });
});

test("Supabase object storage rejects public buckets and incomplete configuration", async () => {
  const store = new SupabaseObjectStore({
    url: "https://project.supabase.co",
    serviceRoleKey: "service-role-test-key",
    bucket: "jarvis-evidence",
    fetchImpl: async () => jsonResponse({ id: "jarvis-evidence", public: true })
  });
  await assert.rejects(() => store.init(), /must be private/);
  assert.throws(() => createObjectStore({
    objectDir: os.tmpdir(),
    supabaseUrl: "https://project.supabase.co",
    bucket: "jarvis-evidence"
  }), /requires URL, service role key, and bucket/);
});
