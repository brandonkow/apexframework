import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const TEXT_TYPES = new Set([
  "text/plain",
  "text/markdown",
  "text/csv",
  "text/html",
  "application/json"
]);

function cleanFileName(value) {
  const name = path.basename(String(value || "evidence.txt"));
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "evidence.txt";
}

function plainText(buffer, mimeType, filename) {
  const type = String(mimeType || "").split(";")[0].trim().toLowerCase();
  const extension = path.extname(String(filename || "")).toLowerCase();
  const textLike = TEXT_TYPES.has(type) || [".txt", ".md", ".csv", ".json", ".html", ".htm"].includes(extension);
  if (!textLike) return "";
  const decoded = Buffer.from(buffer).toString("utf8").replace(/\u0000/g, "").trim();
  if (type === "text/html" || [".html", ".htm"].includes(extension)) {
    return decoded
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/\s+/g, " ")
      .trim();
  }
  if (type === "application/json" || extension === ".json") {
    try {
      return JSON.stringify(JSON.parse(decoded), null, 2);
    } catch {
      return decoded;
    }
  }
  return decoded;
}

export function chunkText(value, { size = 1400, overlap = 180 } = {}) {
  const text = String(value || "").replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  if (!text) return [];
  const chunks = [];
  let cursor = 0;
  while (cursor < text.length) {
    let end = Math.min(text.length, cursor + size);
    if (end < text.length) {
      const paragraph = text.lastIndexOf("\n\n", end);
      const sentence = text.lastIndexOf(". ", end);
      const preferred = Math.max(paragraph, sentence);
      if (preferred > cursor + Math.floor(size * 0.55)) end = preferred + (preferred === sentence ? 1 : 0);
    }
    const content = text.slice(cursor, end).trim();
    if (content) chunks.push(content);
    if (end >= text.length) break;
    cursor = Math.max(cursor + 1, end - overlap);
  }
  return chunks.slice(0, 500);
}

function tokens(value) {
  return [...new Set(String(value || "").toLowerCase().match(/[a-z0-9%.-]{2,}/g) || [])];
}

function lexicalScore(query, value) {
  const terms = tokens(query);
  if (!terms.length) return 0;
  const haystack = String(value || "").toLowerCase();
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0) / terms.length;
}

function cosineSimilarity(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length !== right.length || !left.length) return 0;
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  for (let index = 0; index < left.length; index += 1) {
    const a = Number(left[index] || 0);
    const b = Number(right[index] || 0);
    dot += a * b;
    leftMagnitude += a * a;
    rightMagnitude += b * b;
  }
  if (!leftMagnitude || !rightMagnitude) return 0;
  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

async function openAiRequest(url, options, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload?.error?.message || `OpenAI request failed with status ${response.status}.`);
    }
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

export class KnowledgeService {
  constructor({ objectDir, apiKey = "", embeddingModel = "text-embedding-3-small", transcriptionModel = "gpt-4o-mini-transcribe", speechModel = "gpt-4o-mini-tts", timeoutMs = 25000 }) {
    this.objectDir = objectDir;
    this.apiKey = String(apiKey || "").trim();
    this.embeddingModel = embeddingModel;
    this.transcriptionModel = transcriptionModel;
    this.speechModel = speechModel;
    this.timeoutMs = timeoutMs;
  }

  async init() {
    await mkdir(this.objectDir, { recursive: true });
  }

  embeddingsEnabled() {
    return Boolean(this.apiKey && this.embeddingModel);
  }

  audioEnabled() {
    return Boolean(this.apiKey);
  }

  async storeObject(documentId, filename, buffer) {
    const directory = path.join(this.objectDir, documentId);
    const cleanName = cleanFileName(filename);
    await mkdir(directory, { recursive: true });
    const filePath = path.join(directory, cleanName);
    await writeFile(filePath, buffer, { flag: "wx" });
    return path.relative(this.objectDir, filePath).replace(/\\/g, "/");
  }

  async removeObject(documentId) {
    await rm(path.join(this.objectDir, cleanFileName(documentId)), { recursive: true, force: true });
  }

  extractText(buffer, mimeType, filename) {
    return plainText(buffer, mimeType, filename);
  }

  async embed(input) {
    if (!this.embeddingsEnabled()) return [];
    const values = Array.isArray(input) ? input : [input];
    if (!values.length) return [];
    const response = await openAiRequest("https://api.openai.com/v1/embeddings", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: this.embeddingModel, input: values })
    }, this.timeoutMs);
    const payload = await response.json();
    return (payload.data || []).sort((a, b) => a.index - b.index).map((item) => item.embedding);
  }

  async indexText(documentId, text) {
    const pieces = chunkText(text);
    let embeddings = [];
    let mode = "lexical";
    if (pieces.length && this.embeddingsEnabled()) {
      try {
        for (let index = 0; index < pieces.length; index += 32) {
          embeddings.push(...await this.embed(pieces.slice(index, index + 32)));
        }
        if (embeddings.length === pieces.length) mode = "hybrid";
      } catch (error) {
        console.warn(`EstateLab embedding fallback: ${error.message}`);
        embeddings = [];
      }
    }
    return {
      mode,
      chunks: pieces.map((content, position) => ({
        id: `${documentId}:${position}`,
        documentId,
        position,
        content,
        embedding: embeddings[position] || null
      }))
    };
  }

  async retrieve(query, chunks, limit = 4, { allowEmbedding = true } = {}) {
    const candidates = Array.isArray(chunks) ? chunks : [];
    if (!candidates.length) return { mode: "lexical", matches: [] };
    let queryEmbedding = null;
    if (allowEmbedding && this.embeddingsEnabled() && candidates.some((chunk) => Array.isArray(chunk.embedding))) {
      try {
        [queryEmbedding] = await this.embed(query);
      } catch (error) {
        console.warn(`EstateLab query embedding fallback: ${error.message}`);
      }
    }
    const mode = queryEmbedding ? "hybrid" : "lexical";
    const matches = candidates
      .map((chunk) => {
        const lexical = lexicalScore(query, chunk.content);
        const semantic = queryEmbedding ? Math.max(0, cosineSimilarity(queryEmbedding, chunk.embedding)) : 0;
        return { ...chunk, score: queryEmbedding ? semantic * 0.72 + lexical * 0.28 : lexical };
      })
      .filter((chunk) => chunk.score > 0.02)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
    return { mode, matches };
  }

  async transcribe(buffer, mimeType = "audio/webm", filename = "voice.webm") {
    if (!this.audioEnabled()) throw new Error("Server voice is not configured.");
    const form = new FormData();
    form.append("model", this.transcriptionModel);
    form.append("file", new Blob([buffer], { type: mimeType }), cleanFileName(filename));
    const response = await openAiRequest("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${this.apiKey}` },
      body: form
    }, this.timeoutMs);
    const payload = await response.json();
    return String(payload.text || "").trim();
  }

  async synthesize(text, voice = "marin") {
    if (!this.audioEnabled()) throw new Error("Server voice is not configured.");
    const response = await openAiRequest("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: this.speechModel,
        voice,
        input: String(text || "").slice(0, 4000),
        response_format: "mp3"
      })
    }, this.timeoutMs);
    return Buffer.from(await response.arrayBuffer());
  }
}
