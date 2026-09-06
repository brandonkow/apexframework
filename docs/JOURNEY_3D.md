# Apex Property Journey

## Delivery target

Replace the default Vercel landing experience with a Blender-authored, animated 3D property investigation. Seven connected districts follow the canonical seven-stage framework. The existing owner framework files and deterministic decision engine remain authoritative.

## Acceptance evidence

- A reproducible Blender source script, editable .blend scene, and optimized .glb asset.
- Interactive district selection, animated travel, touch controls, keyboard controls, reduced motion, and a usable non-WebGL fallback.
- Every existing deal/profile input has a checkpoint or an explicitly documented preference role.
- Server-calculated progression requires completing the previous level, including evidence notes. Local storage cannot grant a pass.
- Unknown answers are saved as unresolved evidence; hard stops prevent qualification. Completion is distinct from investment approval.
- Separate saved candidate journeys, edits invalidate downstream completion, reset and export, and a comparison of reviewed properties.
- Existing framework/AI chat remains accessible with the current candidate context. Final analysis calls the existing authenticated/billing-aware report endpoint.
- Mobile layout and end-to-end progression verified with a real browser, plus API and protected-framework regression tests.
- Commit and push to main, then verify the deployed Vercel revision and public 3D assets.

## Architecture

The browser renders exported Blender geometry using a locally bundled Three.js runtime. Scene authoring is offline; Vercel does not need Blender. The canonical `public/index.html` now hosts the journey and the entire workspace. `/journey.html` redirects to `/` on Vercel and resolves to the same shell locally. There is no separate legacy page, stylesheet or browser script. Its API function includes the checkpoint field schema.

Checkpoint controls are mechanically derived from `ui/workspace/panels.html` by `scripts/build-journey-fields.py`. Level definitions group those controls and cite the corresponding canonical framework documents. The founder's 407 inputs inform these rules; they are not a questionnaire that every retail user must answer again.

Progress is stored per candidate in this browser and is recomputed by the server when a checkpoint is submitted. This is an investigation tool: submitted evidence is user-declared until independently verified. A completed route does not imply a guaranteed return or a buy recommendation.

The 97 property/profile controls are divided into 18 checkpoints. The six conversation preferences live in Desk / Preferences; they do not count as investment criteria. Browser progress is not cross-device account storage. Export before clearing browser data or changing devices. Existing server-side reports and account memory continue to use the configured backend storage.

## Unified Workspace

- Journey: seven evidence-led levels and comparisons of active properties.
- Desk: one assistant, shared property inputs, investor profile, DCF/Excel valuation and preferences.
- Library: reports, journal, approved memory, conversations and saved assessments.
- Owner Studio: project coverage, research, operations, market observations, development cases and evidence.
- Account: authentication, plan, verification and decision boundaries.

Feature behavior lives in `ui/workspace/features.js`, with section routing in `workspace.js` and the shared visual system in `public/journey/workspace.css`. Do not reintroduce a fixed legacy card stack or iframe. Advanced fields and detailed report checks use progressive disclosure. Guest and account property spaces are separate. Each active property holds its own DCF assumptions and conversation pointer; requests lock property switching. Editing shared inputs invalidates journey gates and the local report.

Earlier unscoped browser inputs are never silently copied into another account. Where an earlier draft exists, the workspace offers explicit recovery into a separate or unused property slot. Account reports are read inside the Library without replacing the selected property's chat. Printing expands the detailed checks and restores their collapsed state afterwards.

Deployment configuration is not migrated by a UI release: AI needs a server-side provider key, Owner Studio needs the owner token, and production accounts/documents need persistent database and object storage. Vercel's local JSON fallback is not durable storage. Do not claim that Render account data has moved to Vercel merely because the same feature code is deployed there.

## Build and verification

- `npm ci` installs the pinned 3D runtime and builds the browser bundle. `npm run build:journey` rebuilds it after UI edits.
- `blender --background --python scripts/build-journey-world.py` regenerates the editable scene, GLB and illustrated fallback. Blender is needed only for scene authoring.
- `node --test --test-concurrency=1 tests/*.test.js` runs the application and journey regressions.
- `node scripts/journey-browser-check.mjs` checks desktop/mobile rendering and input persistence. Set `JOURNEY_CHECK_URL` to target the deployed site and `PLAYWRIGHT_MODULE` to a Playwright installation.
- `node scripts/journey-flow-check.mjs` exercises every checkpoint, report, chat, comparison, reset and fallback against a local test server without production data.
- `node scripts/workspace-browser-check.mjs` checks the migrated feature journeys, DCF workbook, account separation and four viewport widths. It requires a disposable local data directory and test owner token; it refuses non-local URLs.

The protected-framework hashes use the original committed Git blobs. Four old baselines had Windows CRLF conversion applied; only those hash constants were corrected after checking LF/CRLF equivalence. `.gitattributes` prevents Git from converting the protected Markdown files. The founder documents themselves are unchanged.
