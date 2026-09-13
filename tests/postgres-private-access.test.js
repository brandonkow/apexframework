import assert from "node:assert/strict";
import test from "node:test";
import { PGlite } from "@electric-sql/pglite";
import { POSTGRES_PRIVATE_TABLES, PostgresStateStore } from "../storage.js";

const tables = POSTGRES_PRIVATE_TABLES;
const now = new Date().toISOString();
function seed() {
  return {
    properties: [{ id: "property-one" }], comps: [],
    brain: { answers: [{ id: "founder-unchanged" }], beliefs: [], decisions: [] },
    assistant: { version: 1, sources: [], listings: [], cases: [{ id: "case-one", scope: "user:one", brief: { budgetMax: 500000 }, learning: { theses: [{ claim: "Private thesis sentinel" }], reviews: [] } }] },
    auth: {
      users: ["one", "two"].map(id => ({ id, email: `${id}@example.com`, displayName: id, passwordHash: "synthetic-private-hash", role: "member", createdAt: now, memory: { items: [{ content: "Private memory sentinel" }] } })),
      sessions: [{ tokenHash: "private-token-hash", userId: "one", createdAt: now, expiresAt: "2099-01-01T00:00:00.000Z" }],
      tokens: [{ tokenHash: "private-reset-hash", userId: "one", purpose: "password-reset", createdAt: now, expiresAt: "2099-01-01T00:00:00.000Z" }]
    },
    jarvis: { sessions: [{ id: "session-one", userId: "one", clientId: "client-one", title: "Private conversation", createdAt: now, updatedAt: now, messages: [{ id: "message-one", role: "user", content: "Private message sentinel", createdAt: now }] }] }
  };
}

async function setup() {
  const db = new PGlite();
  const client = {
    async query(sql, params = []) { return params.length ? db.query(sql, params) : (await db.exec(sql)).at(-1) || { rows: [] }; },
    release() {}
  };
  const store = new PostgresStateStore({ connect: async () => client, query: client.query, end: () => db.close() });
  await db.exec("CREATE ROLE apex_server; GRANT USAGE, CREATE ON SCHEMA public TO apex_server; SET ROLE apex_server;");
  return { db, store };
}

test("real PostgreSQL role enforcement protects all private tables without breaking backend writes or other apps", async t => {
  const { db, store } = await setup(); t.after(() => db.close());
  await store.init(seed());
  const first = await store.read();
  assert.equal(first.auth.users.length, 2); assert.equal(first.jarvis.sessions[0].messages[0].content, "Private message sentinel");
  const created = await db.query("SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename LIKE 'estatelab_%' ORDER BY tablename");
  assert.deepEqual(created.rows.map(row => row.tablename), tables.slice().sort(), "Every created private table must join the protection allowlist.");

  // Simulate a pre-existing installation with older managed-host grants and an overly broad policy.
  await db.exec(`RESET ROLE;
    CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE authenticator;
    GRANT anon, authenticated TO authenticator;
    ALTER DEFAULT PRIVILEGES FOR ROLE apex_server IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated;
    SET ROLE apex_server;
    CREATE TABLE another_app (id INT PRIMARY KEY, message TEXT);
    INSERT INTO another_app VALUES (1, 'Unrelated application');
    ${tables.map(name => `ALTER TABLE ${name} DISABLE ROW LEVEL SECURITY; GRANT ALL ON ${name} TO PUBLIC, anon, authenticated; CREATE POLICY legacy_permissive ON ${name} FOR ALL TO PUBLIC USING (true) WITH CHECK (true);`).join("\n")}
    GRANT SELECT (email) ON estatelab_users TO anon;
    SET ROLE anon;`);
  assert.equal((await db.query("SELECT password_hash FROM estatelab_users")).rows.length, 2, "The test must first reproduce the older exposure.");
  await db.exec("RESET ROLE; SET ROLE apex_server;");
  await store.init({ brain: { answers: [{ id: "must-not-replace" }] } });
  assert.deepEqual((await store.read()).brain.answers, first.brain.answers, "Hardening must not replace existing state.");

  const policies = (await db.query("SELECT tablename, permissive FROM pg_policies WHERE policyname = 'apex_backend_only' ORDER BY tablename")).rows;
  assert.deepEqual(policies.map(row => row.tablename), tables.slice().sort());
  assert.ok(policies.every(row => row.permissive === "RESTRICTIVE"));
  const flags = (await db.query("SELECT relname, relrowsecurity FROM pg_class WHERE relname = ANY($1::text[])", [tables])).rows;
  assert.ok(flags.every(row => row.relrowsecurity));
  for (const role of ["anon", "authenticated", "authenticator"]) {
    await db.exec(`RESET ROLE; SET ROLE ${role};`);
    for (const name of tables) {
      for (const sql of [`SELECT * FROM ${name}`, `INSERT INTO ${name} DEFAULT VALUES`, `UPDATE ${name} SET ${name.endsWith("meta") || name.endsWith("core") ? "singleton = singleton" : name.includes("auth_") ? "token_hash = token_hash" : "id = id"}`, `DELETE FROM ${name}`, `TRUNCATE ${name} CASCADE`]) {
        await assert.rejects(db.query(sql), error => error.code === "42501", `${role}: ${sql}`);
      }
    }
    assert.equal((await db.query("SELECT id FROM another_app")).rows[0].id, 1, "Do not revoke another application's default grants.");
  }
  await db.exec("RESET ROLE; SET ROLE apex_server; GRANT SELECT (email) ON estatelab_users TO anon; SET ROLE anon;");
  assert.equal((await db.query("SELECT email FROM estatelab_users")).rows.length, 0, "An accidental column grant must still be denied by the restrictive policy.");

  // Even a later accidental DML grant cannot defeat the restrictive row policy.
  await db.exec("RESET ROLE; SET ROLE apex_server; GRANT SELECT, INSERT, UPDATE, DELETE ON estatelab_users TO anon; SET ROLE anon;");
  assert.equal((await db.query("SELECT * FROM estatelab_users")).rows.length, 0);
  assert.equal((await db.query("UPDATE estatelab_users SET display_name = 'tampered' RETURNING id")).rows.length, 0);
  assert.equal((await db.query("DELETE FROM estatelab_users RETURNING id")).rows.length, 0);
  await assert.rejects(db.query("INSERT INTO estatelab_users (id,email,display_name,password_hash,created_at) VALUES ('forged','x@example.com','x','fake',NOW())"), error => error.code === "42501");
  await db.exec("RESET ROLE; SET ROLE apex_server;");
  await store.init(seed());
  const updated = await store.read(); updated.assistant.cases[0].brief.budgetMax = 450000;
  await store.write(updated);
  const saved = await store.read();
  assert.equal(saved.assistant.cases[0].brief.budgetMax, 450000);
  assert.equal(saved.auth.users[0].memory.items[0].content, "Private memory sentinel");
  assert.deepEqual(saved.brain.answers, first.brain.answers);
  assert.equal(saved.auth.sessions.length, 1); assert.equal(saved.auth.tokens.length, 1);
});

test("migration fails closed when an API role inherits table ownership or truncate rights", async t => {
  const { db, store } = await setup(); t.after(() => db.close());
  await store.init(seed());
  await db.exec("RESET ROLE; CREATE ROLE anon; GRANT apex_server TO anon; SET ROLE apex_server;");
  await assert.rejects(store.init(seed()), /privileged access/);
  await db.exec("RESET ROLE; REVOKE apex_server FROM anon; CREATE ROLE unsafe_parent; GRANT unsafe_parent TO anon; SET ROLE apex_server; GRANT TRUNCATE ON estatelab_core TO unsafe_parent;");
  await assert.rejects(store.init(seed()), /inherits TRUNCATE/);
  await db.exec("REVOKE TRUNCATE ON estatelab_core FROM unsafe_parent;");
  await store.init(seed());
  assert.equal((await store.read()).auth.users.length, 2);
});
