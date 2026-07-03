# Apex Analytic Production Operations

## Owner Evidence

Owner evidence is never accepted from the public Apex Analytic UI. Use the private owner API from a trusted machine or future server-side admin service.

```http
POST /api/owner/documents
x-estatelab-owner-token: <owner token>
Content-Type: application/json

{
  "title": "Bayan Lepas agent interviews, June 2026",
  "filename": "agent-interviews.md",
  "mimeType": "text/markdown",
  "tags": ["Penang", "rental", "agent evidence"],
  "sourceUrl": "https://optional-source.example",
  "text": "The source text..."
}
```

Use `contentBase64` instead of `text` for a file payload. Files are limited to 5 MB. Text, Markdown, CSV, JSON, and HTML are indexed. Unsupported binary formats are retained with `status: stored` but are not retrieved.

Management routes:

- `GET /api/owner/documents`
- `DELETE /api/owner/documents/:id`
- `GET /api/owner/retrieval/metrics`

Retrieval monitoring intentionally excludes raw question text.

## Account Delivery

Set `ESTATELAB_EMAIL_WEBHOOK_URL` to an HTTPS endpoint that accepts the payload below. Set `ESTATELAB_EMAIL_WEBHOOK_SECRET` when the receiver expects a bearer credential.

```json
{
  "app": "Apex Analytic",
  "type": "email-verification",
  "to": "member@example.com",
  "displayName": "Member",
  "token": "single-use-token",
  "expiresAt": "2026-06-21T12:00:00.000Z"
}
```

`type` is `email-verification` or `password-reset`. Verification expires after 24 hours; reset codes expire after 60 minutes. Test this flow before setting `ESTATELAB_REQUIRE_EMAIL_VERIFICATION=true`.

Owner administration:

- `GET /api/admin/users`
- `PATCH /api/admin/users/:id` with any of `role`, `disabled`, or `emailVerified`

The owner token must remain server-side or on a trusted owner machine. Do not add it to browser JavaScript or local storage.

## Voice

Apex Analytic uses browser speech recognition and speech synthesis first. If recognition is missing, the orb records through `MediaRecorder`, then calls server transcription. If browser synthesis is missing, it requests server-generated MP3 speech. The stop control interrupts either path.

Server routes:

- `POST /api/jarvis/transcribe`
- `POST /api/jarvis/speech`

Both require an OpenAI service key through `OPENAI_SERVICES_API_KEY` or a direct `OPENAI_API_KEY`; model and voice names are environment-configurable. An OpenRouter key powers reasoning only.

## Reasoning Provider

For OpenRouter:

```text
OPENROUTER_API_KEY=sk-or-...
OPENROUTER_FREE_ROUTING=true
```

OpenRouter free routing lets the provider select an available free model at request time. Set `OPENROUTER_FREE_ROUTING=false` and provide an exact `LLM_MODEL` only when repeatability matters more than free routing. The server still records provider/model internally, but the public frontend uses model-neutral labels.

Every assistant response also carries a persistent intelligence badge:

- `FRAMEWORK ONLY`: the deterministic framework generated the response because no reasoning model answered.
- `FRAMEWORK + AI`: an external reasoning model generated that response using the retrieved framework context.

The badge belongs to the individual message and remains visible after refresh or cross-device session recovery.

## Deployment Checks

After a Render deployment:

1. Run `npm run smoke -- https://your-apex-service.onrender.com` from a trusted local terminal.
2. Paste the owner token into the Owner console and run `OPS CHECK`.
3. Check `/api/health`; `storage` should be `postgres` when `DATABASE_URL` is configured.
4. Check `/api/jarvis/status`; confirm AI, audio, document, and account-delivery capability flags.
5. Upload one small owner evidence file and confirm it reports `indexed`.
6. Ask Apex Analytic a question containing distinctive terms from that file and confirm an `EVIDENCE` source appears.
7. Review `/api/owner/retrieval/metrics`.
8. Register a test member, verify the code, reset the password, and remove or disable the test account.
9. Test voice once on desktop and once on mobile.

## Owner Operations Snapshot

`GET /api/owner/ops` is owner-token protected. It returns a model-neutral readiness snapshot for:

- Owner-token strength
- PostgreSQL versus JSON fallback storage
- Evidence original-file storage
- AI reasoning configuration
- Email delivery and verification mode
- Billing enforcement, checkout, and webhook readiness
- Owner backup rhythm and external backup reminder setup

Use the Owner console `OPS CHECK` button for the same view without calling the API manually. Treat `missing` as a launch blocker and `warning` as acceptable only when you deliberately chose that tradeoff, such as framework-only mode or billing enforcement off during testing.

## Capacity Boundaries

- Up to 500 evidence documents and 5,000 chunks are kept in the bounded state snapshot.
- The latest 1,000 retrieval events are retained.
- Each conversation session keeps the latest 80 messages; the state keeps the latest 80 sessions.
- Public rate limits are process-local. Use a shared limiter before running multiple web-service instances.
- Uploaded originals need a persistent Render disk. PostgreSQL keeps indexed text and metadata, but not the original file bytes.
