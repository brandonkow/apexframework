# Apex PostgreSQL Storage

## Purpose

PostgreSQL is the production persistence layer for EstateLab accounts, authentication sessions, conversations, messages, and core owner datasets. Local development remains zero-configuration through the JSON fallback.

## Activation

Set:

```text
DATABASE_URL=postgresql://user:password@host:5432/database
ESTATELAB_PG_POOL_MAX=5
ESTATELAB_PG_CA_CERT=optional-managed-database-ca-pem
```

When `DATABASE_URL` is absent, EstateLab uses `ESTATELAB_DATA_DIR/db.json`.

For managed databases that issue certificates from a private CA, set `ESTATELAB_PG_CA_CERT` to the provider's CA PEM and omit `sslmode` from `DATABASE_URL`. EstateLab then enables TLS with certificate and hostname verification. Literal newlines and escaped `\\n` line breaks are both accepted.

## First Migration

On startup EstateLab creates the required schema. If `estatelab_core` is empty, it imports the current JSON database as the initial PostgreSQL state. This includes curated knowledge records, member accounts, hashed login sessions, and Jarvis conversation history.

For the first Render migration:

1. Keep the existing persistent disk mounted.
2. Keep `ESTATELAB_DATA_DIR=/var/data`.
3. Add `DATABASE_URL` using the database's internal connection URL.
4. Deploy once.
5. Check `GET /api/health`; `storage` should report `postgres`.
6. Sign in and verify that the latest conversation resumes.
7. Keep the disk until the PostgreSQL state has been verified and backed up.

## Schema

- `estatelab_meta`: storage revision and update time.
- `estatelab_core`: properties, comparables, owner brain data, evidence metadata, chunks, embeddings, and retrieval events as JSONB.
- `estatelab_users`: member identity, password hashes, verification state, role, and disabled state.
- `estatelab_auth_sessions`: hashed login tokens and expiry.
- `estatelab_auth_tokens`: hashed verification and password-reset codes with purpose and expiry.
- `estatelab_jarvis_sessions`: user or guest conversation ownership.
- `estatelab_jarvis_messages`: ordered messages and source metadata.

The existing table and environment-variable names are compatibility identifiers, not public product branding. Renaming them is not part of this migration.

## Private Database Access

Use a separate Apex database/project, as selected by the owner on 2026-09-13. Do not connect to or migrate tables in the owner's other application project. The prepared Supabase project name is `apex-assistant`; preparation is not confirmation that the project exists or that Vercel is connected.

Apex connects server-side with `DATABASE_URL`, using the table-owning migration role. Browser clients use Apex's authenticated, scoped HTTP routes, never this credential or direct SQL. For a new dedicated Supabase project, leave GitHub integration unlinked, disable the Data API and automatic table exposure, and keep the existing Free plan unless an upgrade is explicitly approved. The user enters and submits their database password privately. A Supabase anonymous/publishable key is not a database connection string.

Every startup protects only the seven tables listed above inside the schema/import transaction:

- Enable row-level security and install the reserved restrictive `apex_backend_only` deny policy. Existing permissive policies cannot override that policy for ordinary non-owner roles.
- Revoke all table privileges from `PUBLIC` and the standard Data API roles (`anon`, `authenticated`, `authenticator`) when those roles exist.
- Reject API roles that can bypass RLS, inherit table ownership, or retain inherited `TRUNCATE` permission. PostgreSQL RLS does not protect `TRUNCATE`.
- Import private seed data only after these protections succeed. Existing accounts, conversations, memory, investigations and founder data are not replaced by a later startup seed.

The table owner continues to perform backend reads and writes; RLS is not forced on that role. Other application tables, database roles, schema-wide defaults and unrelated policies are not modified. Custom privileged roles, security-definer functions and any later changes to grants still require operator review. Never expose the backend credential or service-role key to browser code.

If protection fails, initialization fails and rolls back. It does not certify or repair the previous access configuration of an already-exposed legacy database. Keep that database's Data API disabled, have its administrator remove the identified unsafe role inheritance/grant, and retry. Do not bypass the check or grant broader permissions to get deployment working.

This addresses a real distinction between table grants and row policies, especially on older Supabase setups with automatic public-schema grants. See [Supabase Data API security](https://supabase.com/docs/guides/api/securing-your-api) and [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Verification Before Production Use

`npm test` runs serially to limit local test memory. The dev-only PGlite tests execute the actual migration on an embedded PostgreSQL engine, not SQL-string mocks alone. They reproduce legacy public exposure, verify all seven tables deny standard API-role reads/writes/truncation, test overly permissive policies and inherited access, preserve unrelated tables, and confirm backend state round trips. A separate transaction test verifies failed protection cannot import the seed or commit.

These checks do not verify the hosted project's credentials, TLS, pooler, network rules, backups or Data API endpoint. After securely configuring the separate project's connection on the deployment host:

1. Deploy and verify `/api/health` reports `storage: postgres` and `/api/assistant/status` reports durable storage.
   The read-only command `npm run smoke -- https://apex-jarvis-engine.vercel.app --require-durable --framework-only` fails if these storage signals are missing or a reasoning provider is enabled. It does not write a test case or establish actual cross-redeployment durability.
2. Check the hosted project's table policies/grants and confirm direct public Data API access is disabled or denied. Keep tests scoped to Apex's project.
3. With an explicitly designated test account, verify a private case and its memory survive a new server instance/deployment, cannot be read by another account, and can be exported/deleted normally.
4. Verify backup and restore before relying on long-term records. Private file bytes need their separate durable-object configuration; PostgreSQL alone does not enable uploads.

Do not claim production persistence, model availability or real market coverage solely from a successful code deployment. Existing Render data is not copied by deploying to Vercel; review and export the actual source before any migration.

## Consistency

Reads use a repeatable-read transaction. Writes lock the revision row, synchronize the state inside one transaction, and increment the revision only on commit. A stale writer receives HTTP `409` instead of overwriting newer data.

## Rollback

Removing `DATABASE_URL` switches the app back to JSON. PostgreSQL changes made after migration are not copied back automatically, so this is an operational fallback, not a bidirectional synchronization system. Export or back up PostgreSQL before changing storage modes.

## Remaining Limits

- The application currently synchronizes its bounded in-memory state into normalized tables per write. This is reliable for the current single-service scale, but high-volume growth should move each route to narrower repository operations.
- Authentication and public request limits remain process-local.
- PostgreSQL stores evidence metadata and retrievable chunks, not original bytes. Originals use the private Supabase bucket when configured and otherwise remain in `ESTATELAB_OBJECT_DIR`.
- The bounded JSONB embedding index is appropriate for the current corpus. Large-scale retrieval should move vectors to a purpose-built index.
