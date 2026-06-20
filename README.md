# EstateLab Jarvis

EstateLab Jarvis is a minimal full-stack app for a Malaysia-focused real estate investment second brain.

The public user experience is intentionally simple: users interact with one Jarvis-style chat interface. The EstateLab knowledge base stays controlled by the owner; public users can query guidance and create chat sessions, but they cannot add to or change the underlying knowledge base.

## What Is Included

- Jarvis-style browser UI with voice input and voice response support.
- Optional member accounts with private, resumable chat sessions; guests remain device-scoped.
- PostgreSQL production storage with automatic JSON fallback for local development.
- Seven-stage Deal Analysis using the Deal Card and Financial Profile, with structured verdicts, hard stops, stress metrics, counter-thesis, and missing evidence.
- Node.js backend with a single production database driver dependency (`pg`).
- Public Jarvis endpoints for chat, session creation, and knowledge status.
- Owner-protected APIs for property analysis, RAG querying, beliefs, decisions, and comparable data.
- Seeded EstateLab knowledge base in `data/db.json` and `rag/corpus.json`.
- Deployment-ready health check at `/api/health`.

## Run Locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Environment Variables

```text
PORT=3000
ESTATELAB_OWNER_TOKEN=change-this-before-using-owner-apis
ESTATELAB_DATA_DIR=./data
ESTATELAB_RAG_PATH=./rag/corpus.json
OPENAI_API_KEY=your-server-side-api-key
OPENAI_MODEL=gpt-4.1-mini
OPENAI_TIMEOUT_MS=25000
ESTATELAB_AUTH_SESSION_DAYS=30
DATABASE_URL=postgresql://user:password@host:5432/database
ESTATELAB_PG_POOL_MAX=5
```

`ESTATELAB_OWNER_TOKEN` protects the owner-only APIs. Public Jarvis chat endpoints remain accessible without this token.

`ESTATELAB_DATA_DIR` controls the JSON fallback and PostgreSQL migration source. If the folder is empty on first start, EstateLab seeds it from the bundled `data/db.json`.

`OPENAI_API_KEY` enables conversational AI through the server-side OpenAI Responses API. The key is never sent to the browser. `OPENAI_MODEL` is configurable, and Jarvis automatically falls back to its deterministic EstateLab response engine if the API is unavailable.

When AI mode is enabled, chat messages and any Deal Card or Financial Profile context submitted with the message are sent to OpenAI for response generation. Public input remains conversation data and is not promoted into EstateLab's owner-controlled knowledge base.

Member passwords are scrypt-hashed. Login cookies are opaque, `HttpOnly`, `SameSite=Strict`, and automatically marked `Secure` behind Render HTTPS. Only a hash of each login token is stored. Guest chat access is bound to the originating browser client ID.

When `DATABASE_URL` is set, EstateLab creates its PostgreSQL schema automatically and uses transactional PostgreSQL storage. If the database is empty, the first startup imports the current JSON database as its seed. Without `DATABASE_URL`, EstateLab continues using `data/db.json`.

## Deploy On Render

Render is the recommended first deployment target because it can run the Node service, attach PostgreSQL, and retain the existing persistent disk during migration.

1. Create a new Web Service from this repository.
2. Use `npm install` as the build command.
3. Use `npm start` as the start command.
4. Set `ESTATELAB_OWNER_TOKEN` as a secret environment variable.
5. Set `OPENAI_API_KEY` as a secret environment variable to enable conversational AI.
6. Create or attach a PostgreSQL database and set `DATABASE_URL` to its internal connection URL.
7. Keep the persistent disk and `ESTATELAB_DATA_DIR=/var/data` during the first migration so PostgreSQL can import the existing JSON state.

A starter `render.yaml` blueprint is included. It defines a Node web service in Singapore, `/api/health` health check, and a 1 GB persistent disk mounted at `/var/data`.

Note: Render persistent disks require a paid web service plan. The blueprint keeps the existing disk as a migration source and JSON fallback. Once PostgreSQL has been verified, runtime account and chat persistence no longer depends on that disk.

The bundled EstateLab knowledge base ships with the repo. On first start, if the Render disk is empty, the app seeds the runtime database from `data/db.json`.

## API Boundary

Public:

- `GET /api/health`
- `GET /api/jarvis/status`
- `GET /api/auth/me`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/jarvis/sessions`
- `POST /api/jarvis/sessions`
- `GET /api/jarvis/sessions/:id`
- `DELETE /api/jarvis/sessions/:id`
- `POST /api/jarvis/query`
- `POST /api/jarvis/analyze-deal`

Owner-only:

- Portfolio/property APIs
- Second brain answer, belief, and decision APIs
- Raw RAG guidance API
- Comparable transaction APIs

Owner-only calls require:

```text
x-estatelab-owner-token: your-token
```

## Product Direction

This version includes authentication, user-scoped sessions, and PostgreSQL production storage. The next product infrastructure milestone is evidence ingestion: owner-controlled document uploads, source metadata, embeddings, and retrieval monitoring.
