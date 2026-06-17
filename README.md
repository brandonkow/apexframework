# EstateLab Jarvis

EstateLab Jarvis is a minimal full-stack app for a Malaysia-focused real estate investment second brain.

The public user experience is intentionally simple: users interact with one Jarvis-style chat interface. The EstateLab knowledge base stays controlled by the owner; public users can query guidance and create chat sessions, but they cannot add to or change the underlying knowledge base.

## What Is Included

- Jarvis-style browser UI with voice input and voice response support.
- Node.js backend with no external npm dependencies.
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
```

`ESTATELAB_OWNER_TOKEN` protects the owner-only APIs. Public Jarvis chat endpoints remain accessible without this token.

`ESTATELAB_DATA_DIR` is useful in production. If the folder is empty on first start, the app seeds the runtime database from the bundled `data/db.json`.

## Deploy

Any Node host that supports a long-running web server can run this app.

For Render:

1. Create a new Web Service from this repository.
2. Use `npm install` as the build command.
3. Use `npm start` as the start command.
4. Set `ESTATELAB_OWNER_TOKEN`.
5. Add a persistent disk and set `ESTATELAB_DATA_DIR` to the disk mount path.

A starter `render.yaml` blueprint is included.

## API Boundary

Public:

- `GET /api/health`
- `GET /api/jarvis/status`
- `POST /api/jarvis/sessions`
- `GET /api/jarvis/sessions/:id`
- `DELETE /api/jarvis/sessions/:id`
- `POST /api/jarvis/query`

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

This is the first deployable app layer. The next serious upgrade should be authentication and a real database before opening it to normal users at scale.
