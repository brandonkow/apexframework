import test from "node:test";
import assert from "node:assert/strict";
import { zipSync, strToU8 } from "fflate";
import { newCase, publicCase, addEvent } from "../investment-assistant.js";
import { validatePrivateFile, extractPrivateText, uploadPrivateFile, reviewPrivateFile, readFileWithAi, readPrivateOriginal, removePrivateFile, cleanupPrivateFiles, validFileReading } from "../assistant-files.js";
import { deleteInvestigation } from "../assistant-context.js";
import { assistantCaseContext } from "../assistant-reasoning.js";
import { assistantRoutes } from "../assistant-routes.js";
import { extractDocument } from "../assistant-file-worker.js";

const payload = (value = "Synthetic site note: inspect the drainage.", filename = "site.txt") => ({ filename, contentBase64: Buffer.from(value).toString("base64"), consentStore: true });
function fixture() {
  const record = newCase("user:one"), files = new Map(), events = [];
  let db = { assistant: { cases: [record], sources: [], listings: [] }, knowledge: { documents: [], chunks: [] } };
  const deps = { readDb: async () => structuredClone(db), writeDb: async value => { db = structuredClone(value); }, objectStore: {
    durable: true, store: async (id, name, buffer) => { const key = `${id}/${name}`; files.set(key, Buffer.from(buffer)); events.push("store"); return key; },
    read: async key => { if (!files.has(key)) throw new Error("Missing file"); return files.get(key); },
    remove: async id => { for (const key of files.keys()) if (key.startsWith(`${id}/`)) files.delete(key); events.push("remove"); }
  }, llmEnabled: () => true };
  return { record, files, events, deps, latest: async () => (await deps.readDb()).assistant.cases[0] };
}
function pdfFixture() {
  const stream = "BT /F1 12 Tf 40 740 Td (SYNTHETIC rental evidence RM2400) Tj ET";
  const objects = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>", `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let pdf = "%PDF-1.4\n", offsets = [0];
  objects.forEach((object, i) => { offsets.push(pdf.length); pdf += `${i + 1} 0 obj\n${object}\nendobj\n`; });
  const xref = pdf.length;
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(offset => String(offset).padStart(10, "0") + " 00000 n ").join("\n")}\ntrailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return Buffer.from(pdf);
}

test("private file validation requires consent, bounded canonical bytes and matching type", () => {
  assert.equal(validatePrivateFile(payload()).type, "text/plain");
  assert.equal(validatePrivateFile(payload(Buffer.alloc(2 * 1024 * 1024, 65))).buffer.length, 2 * 1024 * 1024);
  for (const input of [null, {}, { ...payload(), consentStore: false }, payload("<script>bad</script>", "bad.html"), payload("not pdf", "fake.pdf"), payload("not PNG", "fake.png"), { ...payload(), contentBase64: "#invalid#" }, { ...payload(), contentBase64: "AB==" }, payload(Buffer.alloc(2 * 1024 * 1024 + 1)), { ...payload(), mimeType: "application/pdf" }]) assert.throws(() => validatePrivateFile(input));
});

test("bounded local parsing extracts text and real PDF text with explicit coverage", async () => {
  const plain = await extractPrivateText(Buffer.from("SYNTHETIC untrusted note <script>no execution</script>"), "text/plain");
  assert.match(plain.text, /SYNTHETIC/); assert.equal(plain.status, "draft");
  const pdf = await extractPrivateText(pdfFixture(), "application/pdf");
  if (!pdf.text) await extractDocument({ buffer: pdfFixture(), type: "application/pdf" });
  assert.match(pdf.text, /RM2400/); assert.match(pdf.coverage, /1\/1 pages/);
  const broken = await extractPrivateText(Buffer.from("%PDF- broken"), "application/pdf");
  assert.equal(broken.status, "manual_review");
  const timeout = await extractPrivateText(pdfFixture(), "application/pdf", { timeoutMs: 1 });
  assert.equal(timeout.status, "manual_review");
});

test("DOCX reads structured parts without active content, entities or oversized expansion", async () => {
  const xml = '<w:document xmlns:w="urn:test"><w:body><w:p><w:r><w:t>SYNTHETIC visit report</w:t></w:r></w:p><w:del><w:r><w:t>Deleted claim</w:t></w:r></w:del></w:body></w:document>';
  const doc = zipSync({ "word/document.xml": strToU8(xml), "word/header1.xml": strToU8('<w:hdr xmlns:w="urn:test"><w:p><w:r><w:t>Test header</w:t></w:r></w:p></w:hdr>') });
  const parsed = await extractPrivateText(doc, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  assert.match(parsed.text, /SYNTHETIC visit report/); assert.match(parsed.text, /Test header/); assert.doesNotMatch(parsed.text, /Deleted claim/);
  for (const value of ['<!DOCTYPE foo [<!ENTITY x SYSTEM "file:///secret">]>' + xml, "x".repeat(9 * 1024 * 1024)]) {
    const result = await extractPrivateText(zipSync({ "word/document.xml": strToU8(value) }), "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    assert.equal(result.status, "manual_review");
  }
});

test("private originals and extraction never enter shared knowledge or working inputs without review", async () => {
  const f = fixture(); await uploadPrivateFile(f.record, 0, payload(), f.deps);
  let record = await f.latest(), file = record.attachments[0];
  assert.equal(f.files.size, 1); assert.equal(record.evidence.length, 0); assert.equal(record.working, undefined);
  assert.deepEqual((await f.deps.readDb()).knowledge, { documents: [], chunks: [] });
  assert.equal(publicCase(record).attachments[0].storageKey, undefined);
  assert.deepEqual(assistantCaseContext(record, (await f.deps.readDb()).assistant).privateFileNotes, []);
  assert.throws(() => reviewPrivateFile(record, file, { note: "Agent's statement without review.", checkedAt: "2026-09-01" }));
  reviewPrivateFile(record, file, { confirmReviewed: true, note: "I checked the original site note; drainage still needs an inspection.", checkedAt: "2026-09-01" });
  assert.equal(record.evidence[0].attachmentId, file.id); assert.equal(record.evidence[0].status, "user_declared");
  assert.equal(assistantCaseContext(record, {}).privateFileNotes.length, 1);
  assert.equal(record.tasks.length, 0);
});

test("duplicate upload and concurrent case deletion cannot leave accessible or untracked originals", async () => {
  const f = fixture(); await uploadPrivateFile(f.record, 0, payload(), f.deps);
  await assert.rejects(uploadPrivateFile(await f.latest(), 1, payload(), f.deps), /already attached/);
  const g = fixture(), store = g.deps.objectStore.store;
  g.deps.objectStore.store = async (...args) => { await deleteInvestigation(g.record.id, g.record.scope, g.deps); return store(...args); };
  await assert.rejects(uploadPrivateFile(g.record, 0, payload(), g.deps), /changed during upload/);
  assert.equal(g.files.size, 0); assert.equal((await g.deps.readDb()).assistant.cases.length, 0);
});

test("cleanup does not race an active upload; failed deletions remain retryable after metadata removal", async () => {
  const f = fixture(), store = f.deps.objectStore.store;
  f.deps.objectStore.store = async (...args) => { const key = await store(...args); await cleanupPrivateFiles(f.record.scope, f.deps); assert.equal(f.files.size, 1); return key; };
  await uploadPrivateFile(f.record, 0, payload(), f.deps);
  const record = await f.latest(), originalRemove = f.deps.objectStore.remove;
  f.deps.objectStore.remove = async () => { throw new Error("Transient storage failure"); };
  assert.equal(await removePrivateFile(record, record.revision, record.attachments[0], f.deps), 1);
  assert.equal((await f.latest()).attachments.length, 0); assert.equal(f.files.size, 1);
  f.deps.objectStore.remove = originalRemove;
  assert.equal(await cleanupPrivateFiles(record.scope, f.deps), 0); assert.equal(f.files.size, 0);
});

test("case deletion queues and removes all original files", async () => {
  const f = fixture(); await uploadPrivateFile(f.record, 0, payload(), f.deps);
  await uploadPrivateFile(await f.latest(), 1, payload("Second synthetic note", "two.txt"), f.deps);
  assert.equal(f.files.size, 2);
  assert.equal(await deleteInvestigation(f.record.id, f.record.scope, f.deps), 0);
  assert.equal(f.files.size, 0); assert.equal((await f.deps.readDb()).assistant.cases.length, 0);
});

test("an expired upload cannot commit a file already claimed by cleanup", async () => {
  const f = fixture(), store = f.deps.objectStore.store;
  f.deps.objectStore.store = async (...args) => {
    const key = await store(...args), db = await f.deps.readDb();
    db.assistant.fileCleanup[0].notBefore = 0; await f.deps.writeDb(db);
    await cleanupPrivateFiles(f.record.scope, f.deps); return key;
  };
  await assert.rejects(uploadPrivateFile(f.record, 0, payload(), f.deps), /expired/);
  assert.equal((await f.latest()).attachments, undefined); assert.equal(f.files.size, 0);
});

test("a late object-store completion after cleanup is queued again and removed", async () => {
  const f = fixture(), store = f.deps.objectStore.store;
  f.deps.objectStore.store = async (...args) => {
    const db = await f.deps.readDb(); db.assistant.fileCleanup[0].notBefore = 0; await f.deps.writeDb(db);
    await cleanupPrivateFiles(f.record.scope, f.deps);
    return store(...args);
  };
  await assert.rejects(uploadPrivateFile(f.record, 0, payload(), f.deps), /expired/);
  assert.equal(f.files.size, 0); assert.equal((await f.deps.readDb()).assistant.fileCleanup.length, 0);
});

test("AI file reading requires separate consent and validates output before retaining a draft", async () => {
  const f = fixture(); await uploadPrivateFile(f.record, 0, payload(), f.deps);
  let record = await f.latest(), requests = 0;
  f.deps.requestLlmText = async options => { requests++; assert.equal(options.maxAttempts, 1); assert.match(options.instructions, /untrusted/); assert.match(options.input, /Synthetic site note/); return { text: JSON.stringify({ summary: "A drainage check is suggested.", observations: ["A note mentions drainage."], questions: ["Was it inspected?"] }), provider: "test", model: "test-only" }; };
  await assert.rejects(readFileWithAi(record, record.revision, record.attachments[0], {}, f.deps), /consent/); assert.equal(requests, 0);
  await readFileWithAi(record, record.revision, record.attachments[0], { consentAi: true }, f.deps);
  record = await f.latest(); assert.equal(record.attachments[0].aiDraft.status, "unverified_ai_draft"); assert.equal(record.evidence.length, 0);
  f.deps.requestLlmText = async () => ({ text: '{"summary":"BUY NOW"}' });
  await readFileWithAi(record, record.revision, record.attachments[0], { consentAi: true }, f.deps);
  assert.match((await f.latest()).attachments[0].aiError, /could not complete/);
  assert.equal(validFileReading('{"summary":"BUY NOW"}'), false);
});

test("file routes are private, origin checked, attachment-only downloads and disabled on temporary hosts", async () => {
  const f = fixture();
  async function request(route, body, { user = "one", method = "POST", ephemeral = false, origin = "http://localhost" } = {}) {
    let result;
    try { await assistantRoutes({ ...f.deps, req: { method, headers: { host: "localhost", origin } }, res: {}, url: new URL(`http://localhost/api/assistant/cases/${f.record.id}/files${route ? "/" + route : ""}`), db: await f.deps.readDb(), actor: { user: { id: user } }, send: (_, status, value, headers) => { result = { status, value, headers }; }, readBody: async () => body, allowRequest: () => true, storeKind: "json", ephemeral }); }
    catch (error) { result = { status: error.statusCode, error: error.message }; }
    return result;
  }
  assert.equal((await request("", { ...payload(), revision: 0 }, { ephemeral: true })).status, 503);
  assert.equal((await request("", { ...payload(), revision: 0 }, { origin: "https://attacker.example" })).status, 403);
  const added = await request("", { ...payload(), revision: 0 }); assert.equal(added.status, 201);
  const id = added.value.case.attachments[0].id;
  assert.equal((await request(id, null, { method: "GET", user: "two" })).status, 404);
  const download = await request(id, null, { method: "GET" });
  assert.equal(download.status, 200); assert.match(download.headers["Content-Disposition"], /^attachment/); assert.match(download.headers["Cache-Control"], /no-store/);
  assert.equal(download.value.toString(), "Synthetic site note: inspect the drainage.");
  assert.equal((await request(id + "/review", { revision: 0 })).status, 409);
});

test("photos stay uninterpreted until consented AI reading, and original checksum changes stop it", async () => {
  const f = fixture(), png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9eYAAAAASUVORK5CYII=", "base64");
  await uploadPrivateFile(f.record, 0, payload(png, "site.png"), f.deps);
  let record = await f.latest(), file = record.attachments[0];
  assert.equal(file.extraction.status, "manual_review"); assert.equal(file.extraction.text, "");
  f.deps.requestLlmText = async options => { assert.equal(options.privateInput, true); assert.equal(options.inputImages.length, 1); assert.equal(options.inputImages[0].base64, png.toString("base64")); return { text: JSON.stringify({ summary: "No property conclusion is supported by this tiny test image.", observations: [], questions: ["Can you supply a relevant photo?"] }), provider: "test", model: "test-only" }; };
  await readFileWithAi(record, record.revision, file, { consentAi: true }, f.deps);
  assert.equal((await f.latest()).evidence.length, 0);
  f.files.set(file.storageKey, Buffer.from("changed bytes"));
  await assert.rejects(readPrivateOriginal(file, f.deps.objectStore), /checksum/);
});
