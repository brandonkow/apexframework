import { parentPort, workerData } from "node:worker_threads";
import { Unzip, UnzipInflate } from "fflate";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import { getDocumentProxy } from "unpdf";

const LIMIT = 40000;
export async function extractDocument({ buffer, type }) {
  const bytes = new Uint8Array(buffer);
  if (type === "text/plain") {
    const value = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    if (/[\x00-\x08\x0e-\x1f]/.test(value)) throw new Error("Not a plain-text document.");
    return { text: value.slice(0, LIMIT), coverage: value.length > LIMIT ? "First 40,000 characters only." : "Complete UTF-8 text file.", partial: value.length > LIMIT };
  }
  if (type === "application/pdf") {
    const pdf = await getDocumentProxy(bytes, { isEvalSupported: false, useSystemFonts: true, disableFontFace: true, stopAtErrors: true, standardFontDataUrl: null, cMapUrl: null });
    let text = "", pages = 0, characters = 0;
    try {
      for (let pageNo = 1; pageNo <= Math.min(pdf.numPages, 40) && text.length < LIMIT; pageNo++) {
        const page = await pdf.getPage(pageNo), content = await page.getTextContent();
        const pageText = content.items.map(item => item.str || "").join(" ");
        characters += pageText.trim().length;
        text += `\n[Page ${pageNo}]\n${pageText}\n`;
        pages++; page.cleanup();
      }
      return { text: characters ? text.slice(0, LIMIT) : "", partial: !characters || pages < pdf.numPages || text.length > LIMIT, coverage: `Text layer of ${pages}/${pdf.numPages} pages, up to 40,000 characters. Scans, diagrams and layout are not read; inspect the original.` };
    } finally { await pdf.loadingTask.destroy(); }
  }
  if (type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const parts = new Map(); let count = 0, expanded = 0, error;
    const unzip = new Unzip(file => {
      if (++count > 500) throw new Error("Too many archive entries.");
      if (!/^word\/(document|header\d+|footer\d+|footnotes|endnotes)\.xml$/.test(file.name)) return;
      if (parts.has(file.name)) throw new Error("Duplicate document parts.");
      const chunks = []; parts.set(file.name, chunks);
      file.ondata = (err, chunk) => {
        if (err) { error = err; return; }
        expanded += chunk.length;
        if (expanded > 8 * 1024 * 1024) { file.terminate(); error = new Error("Expanded document is too large."); return; }
        chunks.push(chunk);
      };
      file.start();
    });
    unzip.register(UnzipInflate);
    for (let i = 0; i < bytes.length; i += 1024) {
      unzip.push(bytes.subarray(i, i + 1024), i + 1024 >= bytes.length);
      if (error) throw error;
    }
    if (!parts.has("word/document.xml")) throw new Error("Not a Word document.");
    const parser = new XMLParser({ preserveOrder: true, ignoreAttributes: true, parseTagValue: false, trimValues: false, processEntities: false });
    let text = "", hasText = false;
    function walk(nodes) {
      for (const node of nodes || []) for (const [key, value] of Object.entries(node)) {
        if (key === "w:del") continue;
        if (key === "w:t") { const content = value.map(entry => entry["#text"] || "").join(""); text += content; hasText ||= Boolean(content.trim()); }
        else if (Array.isArray(value)) walk(value);
        if (["w:p", "w:tr", "w:tc"].includes(key)) text += "\n";
        if (text.length > LIMIT) return;
      }
    }
    for (const [name, chunks] of parts) {
      const xml = Buffer.concat(chunks).toString("utf8");
      if (/<!DOCTYPE|<!ENTITY/i.test(xml) || XMLValidator.validate(xml) !== true) throw new Error("Unsafe or invalid document XML.");
      text += `\n[${name}]\n`; walk(parser.parse(xml));
      if (text.length > LIMIT) break;
    }
    return { text: hasText ? text.slice(0, LIMIT) : "", partial: !hasText || text.length > LIMIT, coverage: "Main body, headers, footers and notes, up to 40,000 characters. Images, embedded files, comments and deleted tracked text are excluded. Layout and XML entities may need manual review." };
  }
  return { text: "", partial: true, coverage: "Photo retained for your review. No visual observations inferred. Optional AI reading requires separate consent and a compatible configured model." };
}

if (parentPort) {
  try { parentPort.postMessage({ result: await extractDocument(workerData) }); }
  catch { parentPort.postMessage({ error: "Text could not be safely extracted. This may be a scan, encrypted, damaged or oversized document. Review the original and write your own note." }); }
}
