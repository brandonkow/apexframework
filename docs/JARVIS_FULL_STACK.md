# Jarvis Full-Stack Architecture

## Product Shape

EstateLab Jarvis is no longer only a static local page. It is a full-stack assistant with:

- A frontend voice/chat interface in `public/`.
- A Node backend in `server.js`.
- A curated owner knowledge base in `docs/`, `rag/corpus.json`, and the selected runtime store.
- Public Jarvis chat sessions persisted separately from the curated knowledge base.
- Optional member authentication with private, resumable sessions.
- Owner-only APIs protected by `ESTATELAB_OWNER_TOKEN`.
- Owner-controlled evidence ingestion with private source-file storage.
- Hybrid lexical/embedding retrieval with privacy-conscious monitoring.
- Browser voice with server transcription and speech fallback.

## Boundary

Normal users can:

- Open the Jarvis frontend.
- Create a Jarvis session.
- Ask questions.
- Receive answers from curated references, beliefs, and decisions.
- Continue the same browser session with persisted chat history.
- Create an account and resume their latest private conversation on another device.

Normal users cannot:

- Add beliefs.
- Edit framework files.
- Add RAG references.
- Add property data.
- Edit decisions.
- Modify the owner knowledge base.

Public chat history is stored in PostgreSQL or under `jarvis.sessions` in the JSON fallback. It is conversation memory, not curated knowledge.

Guest sessions are bound to their browser client ID. Member sessions are bound to the authenticated user ID. Session IDs alone do not grant read or delete access.

## Public Jarvis APIs

- `GET /api/jarvis/status`
- `GET /api/auth/me`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `POST /api/auth/request-verification`
- `POST /api/auth/verify-email`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/jarvis/sessions`
- `POST /api/jarvis/sessions`
- `GET /api/jarvis/sessions/:id`
- `DELETE /api/jarvis/sessions/:id`
- `POST /api/jarvis/query`
- `POST /api/jarvis/analyze-deal`
- `POST /api/jarvis/transcribe`
- `POST /api/jarvis/speech`

`POST /api/jarvis/query` accepts:

```json
{
  "query": "Should I buy this property?",
  "sessionId": "optional-existing-session-id",
  "clientId": "browser-client-id"
}
```

It returns:

```json
{
  "answer": "Jarvis response",
  "sources": [],
  "message": {},
  "session": {}
}
```

## Owner APIs

Existing non-Jarvis APIs remain owner-only unless explicitly marked public by `isPublicApiRoute()` in `server.js`.

Owner APIs require:

```http
x-estatelab-owner-token: <ESTATELAB_OWNER_TOKEN>
```

If no owner token is configured, owner APIs are disabled.

Evidence and administration endpoints are intentionally owner-only:

- `GET|POST /api/owner/documents`
- `DELETE /api/owner/documents/:id`
- `GET /api/owner/retrieval/metrics`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`

## Storage

EstateLab supports two storage modes:

- PostgreSQL when `DATABASE_URL` is configured. Users, auth sessions, Jarvis sessions, and messages use normalized tables. Core owner datasets use JSONB columns inside the same transactional store.
- `data/db.json` when `DATABASE_URL` is absent. This remains the zero-configuration local fallback and migration source.
- `rag/corpus.json`: retrieval snippets.
- `docs/`: long-form framework and operating rules.
- `ESTATELAB_OBJECT_DIR`: private originals uploaded by the owner.

Evidence metadata, chunks, embeddings, and retrieval events live in the selected state store. Raw questions are not written to retrieval monitoring; monitoring records a short hash, length, source IDs, retrieval mode, latency, and optional member ID.

The PostgreSQL schema is created automatically. An empty database imports the current JSON state on first startup. Revision checks reject stale concurrent writes instead of silently overwriting newer state.

## Production Services

- Uploaded originals are stored under the private object directory; text-compatible files are extracted and chunked immediately.
- OpenAI embeddings produce hybrid semantic and lexical retrieval when configured. Lexical retrieval remains the deterministic fallback.
- Email verification and password-reset codes use a configurable server webhook. Owner account administration never exposes the owner token to the frontend.
- Public chat, audio, and account endpoints have source-address request windows plus body and message limits.
- Browser speech APIs remain the low-latency default. Server transcription is used when browser recognition is absent; server speech is used when browser synthesis is absent.

## Bounded Limits

- Request limits are process-local and reset when the service restarts. A multi-instance deployment should move these counters to Redis or PostgreSQL.
- Source originals rely on the configured object directory. Render deployments need a persistent disk or a future external object-store adapter.
- PDF and binary office documents are stored but need an extraction service before they become retrievable.
- The current embedding index is bounded state stored as JSONB or JSON. Move to a dedicated vector extension or service only after corpus size and latency justify it.
