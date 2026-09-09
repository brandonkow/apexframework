# Private investigation files

## Boundary

The assistant's **Private evidence** section is separate from the owner knowledge vault. TXT, PDF, DOCX, PNG and JPEG uploads belong only to an authorized investigation scope. They never create owner documents, shared retrieval chunks, catalogue listings, approved financial figures or completed framework checkpoints. The 407 founder answers are unchanged.

The initial limits are 2 MB per file, 12 files and 16 MB per investigation. Users explicitly confirm their permission to store a file and are asked to redact identity, account and contact details, faces and unwanted location metadata. Originals are retained as supplied; automatic redaction, EXIF removal and malware scanning are **not** provided. Downloaded originals must still be treated as untrusted documents.

## Workflow

1. Attach a permitted file. Text extraction runs on Apex's server, not solely on the user's device. It does not contact an AI provider.
2. Read the coverage notice and inspect the original. Download responses are scoped, attachment-only, non-cacheable and checked against the saved SHA-256 checksum.
3. Optionally request AI reading with a separate unchecked consent box. Text documents send at most 12,000 extracted characters and the filename; photos send their original bytes and filename. The shared chat AI checkbox does not authorize this operation.
4. Write a dated review note and explicitly confirm that the original and note were reviewed. Only that note enters private reasoning context. Extracted text and AI drafts are not automatically treated as evidence or transferred into property/financial assumptions.
5. Delete a file or its investigation when no longer needed. Its linked evidence note is removed. Prior conversation quotations and already downloaded exports are not silently erased. Deletion cannot retract a provider request already sent; provider retention rules still apply. JSON exports contain metadata, extraction and review notes, **not original file bytes**; originals are downloaded individually.

## Extraction coverage

- UTF-8 text: first 40,000 characters, with truncation disclosed.
- PDF: text layer of at most 40 pages and 40,000 characters. Image-only scans, diagrams and visual layout are not read. Missing/unsupported fonts, encrypted or damaged PDFs can require manual review.
- DOCX: main body, headers, footers, footnotes and endnotes, capped at 40,000 characters. Comments, embedded files, images, deleted tracked text and layout are excluded. XML entities may remain literal. Archive expansion is bounded; DTD/entity definitions are rejected.
- PNG/JPEG: retained without inferring visible content. AI reading is optional and requires a compatible configured model. It cannot prove title, tenancy, structural safety, management quality or an actual site visit.

Parsers run in a worker with an eight-second deadline and a 128 MB JavaScript heap limit. Parser logs are discarded to avoid leaking private contents to application logs. This is resource containment, not a malware-safety guarantee. Failure leaves the original available with a manual-review notice, not a fabricated reading. Generated observations must remain tentative and must not infer tenant quality from nationality, ethnicity or income.

## Storage and concurrency

On Vercel, uploads remain disabled until **both** PostgreSQL and private durable object storage are configured. Local JSON/object storage is available for local development. The existing private Supabase bucket controls are reused, but files use random private prefixes and are served only after case-scope authorization; storage keys are not returned in public case JSON. Both storage and state must remain available for reliable recovery.

Uploads reserve a cleanup record before writing the original. A successful case write and removal of its reservation happen together under the database revision check. Concurrent deletion, ownership transfer or edits reject stale saves. Cleanup first claims a pending deletion so an expired upload cannot commit an original being removed. Late object-store completions are queued again. Failed deletions retain an inaccessible cleanup record and can be retried with **More > Retry private file cleanup**, including after the last investigation is deleted. Cleanup retries are user-triggered, not scheduled monitoring.

Removing an attachment also removes its linked reviewed evidence. Case deletion queues every original. Failed or unconfirmed uploads never become source evidence. Unsent review text is retained in the active view on a file conflict, with explicit choices between the local and saved note. Unsent text is not a durable saved record and is cleared on page reload, account change or investigation switch.

## APIs

All mutations use the existing same-origin and request-limit controls. File mutations require the expected case revision.

- `POST /api/assistant/cases/:id/files`: canonical base64 upload, filename/type and `consentStore: true`.
- `GET /api/assistant/cases/:id/files/:fileId`: authenticated/scoped original download.
- `POST .../:fileId/review`: dated note and `confirmReviewed: true`.
- `POST .../:fileId/read`: `consentAi: true`; one bounded model attempt, at most 1,000 output tokens, with schema validation. Three requests per ten minutes per rate-limit identity.
- `POST .../:fileId`: `action: "delete"`.
- `POST /api/assistant/cleanup`: retry pending private original removal for the active scope.

`GET /api/assistant/status` exposes file readiness and pending cleanup count. AI failure does not confirm evidence and does not trigger an automatic paid retry. OpenAI private file readings use `store: false`; OpenRouter uses the existing configured provider data-collection controls. These settings do not promise blanket zero retention across providers.

## Runtime and references

The app and Render blueprint now target Node 24, matching the tested runtime and current parser requirement. Vercel selects the major version through `package.json`; `/api/health` reports the actual Node version. See [Vercel Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

Local parsing uses [unpdf's serverless PDF.js build](https://github.com/unjs/unpdf) and [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser). Image request formats follow [OpenRouter image inputs](https://openrouter.ai/docs/guides/overview/multimodal/image-understanding) and [OpenAI image inputs](https://developers.openai.com/api/docs/guides/images-vision). No provider key, account credential or real private document is included in test fixtures.

## Verification and remaining gates

`tests/assistant-files.test.js` covers file validation, actual PDF/DOCX text extraction, archive bounds, consent, scope isolation, read-only source boundaries, deletion/upload races, cleanup retry, checksum integrity, and reviewed-versus-unconfirmed context. `tests/private-file-provider.test.js` uses local mock servers to verify both multimodal request formats and the one-attempt limit; this does not prove live model accuracy. Object-store tests cover authenticated bounded reads.

The assistant browser suite uploads and reviews a synthetic document, reloads it, checks original download, tests a conflicting review without losing the local draft, checks four viewport widths and deletes the file. Production checks remain read-only and do not upload synthetic or private records. Configured persistent storage and a live compatible model are still separate production gates.
