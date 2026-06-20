# EstateLab PostgreSQL Storage

## Purpose

PostgreSQL is the production persistence layer for EstateLab accounts, authentication sessions, conversations, messages, and core owner datasets. Local development remains zero-configuration through the JSON fallback.

## Activation

Set:

```text
DATABASE_URL=postgresql://user:password@host:5432/database
ESTATELAB_PG_POOL_MAX=5
```

When `DATABASE_URL` is absent, EstateLab uses `ESTATELAB_DATA_DIR/db.json`.

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

## Consistency

Reads use a repeatable-read transaction. Writes lock the revision row, synchronize the state inside one transaction, and increment the revision only on commit. A stale writer receives HTTP `409` instead of overwriting newer data.

## Rollback

Removing `DATABASE_URL` switches the app back to JSON. PostgreSQL changes made after migration are not copied back automatically, so this is an operational fallback, not a bidirectional synchronization system. Export or back up PostgreSQL before changing storage modes.

## Remaining Limits

- The application currently synchronizes its bounded in-memory state into normalized tables per write. This is reliable for the current single-service scale, but high-volume growth should move each route to narrower repository operations.
- Authentication and public request limits remain process-local.
- Raw uploaded source files remain in `ESTATELAB_OBJECT_DIR`; PostgreSQL stores their metadata and retrievable chunks, not the original bytes.
- The bounded JSONB embedding index is appropriate for the current corpus. Large-scale retrieval should move vectors to a purpose-built index.
