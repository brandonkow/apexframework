import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

function cleanSegment(value, fallback = "evidence") {
  const name = path.basename(String(value || fallback));
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || fallback;
}

function cleanStorageKey(value) {
  const parts = String(value || "")
    .replaceAll("\\", "/")
    .split("/")
    .filter(Boolean);
  if (!parts.length || parts.some((part) => part === "." || part === "..")) {
    throw new Error("Invalid evidence storage key.");
  }
  return parts.map((part) => cleanSegment(part)).join("/");
}

function encodedStorageKey(value) {
  return cleanStorageKey(value).split("/").map(encodeURIComponent).join("/");
}

async function responseMessage(response) {
  const payload = await response.json().catch(() => ({}));
  return String(payload?.message || payload?.error || payload?.error_description || "Storage request failed.");
}

export class LocalObjectStore {
  constructor(rootDir) {
    this.rootDir = path.resolve(rootDir);
    this.kind = "local";
    this.durable = false;
  }

  async init() {
    await mkdir(this.rootDir, { recursive: true });
  }

  async store(documentId, filename, buffer) {
    const directory = path.join(this.rootDir, cleanSegment(documentId));
    const filePath = path.join(directory, cleanSegment(filename, "evidence.txt"));
    await mkdir(directory, { recursive: true });
    await writeFile(filePath, buffer, { flag: "wx" });
    return path.relative(this.rootDir, filePath).replaceAll("\\", "/");
  }

  async remove(documentId) {
    await rm(path.join(this.rootDir, cleanSegment(documentId)), { recursive: true, force: true });
  }
}

export class SupabaseObjectStore {
  constructor({ url, serviceRoleKey, bucket, fetchImpl = globalThis.fetch, timeoutMs = 25000 }) {
    const baseUrl = new URL(String(url || ""));
    if (baseUrl.protocol !== "https:" && !["localhost", "127.0.0.1", "::1"].includes(baseUrl.hostname)) {
      throw new Error("Supabase object storage URL must use HTTPS.");
    }
    if (!String(serviceRoleKey || "").trim()) throw new Error("Supabase object storage requires a service role key.");
    if (typeof fetchImpl !== "function") throw new Error("Supabase object storage requires fetch support.");
    this.baseUrl = baseUrl.toString().replace(/\/$/, "");
    this.serviceRoleKey = String(serviceRoleKey).trim();
    this.bucket = cleanSegment(bucket, "jarvis-evidence");
    this.fetchImpl = fetchImpl;
    this.timeoutMs = timeoutMs;
    this.kind = "supabase";
    this.durable = true;
  }

  async request(pathname, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const response = await this.fetchImpl(`${this.baseUrl}${pathname}`, {
        ...options,
        headers: {
          apikey: this.serviceRoleKey,
          Authorization: `Bearer ${this.serviceRoleKey}`,
          ...(options.headers || {})
        },
        signal: controller.signal
      });
      if (!response.ok) {
        const message = await responseMessage(response);
        throw new Error(`Supabase object storage request failed (${response.status}): ${message}`);
      }
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  async init() {
    const response = await this.request(`/storage/v1/bucket/${encodeURIComponent(this.bucket)}`);
    const bucket = await response.json();
    if (bucket?.public === true) throw new Error("Jarvis evidence storage bucket must be private.");
  }

  async store(documentId, filename, buffer, { contentType = "application/octet-stream" } = {}) {
    const key = `${cleanSegment(documentId)}/${cleanSegment(filename, "evidence.txt")}`;
    await this.request(`/storage/v1/object/${encodeURIComponent(this.bucket)}/${encodedStorageKey(key)}`, {
      method: "POST",
      headers: {
        "Content-Type": String(contentType || "application/octet-stream"),
        "Cache-Control": "no-store",
        "x-upsert": "false"
      },
      body: Buffer.from(buffer)
    });
    return key;
  }

  async remove(documentId, storageKey = "") {
    let keys = storageKey ? [cleanStorageKey(storageKey)] : [];
    if (!keys.length) {
      const prefix = cleanSegment(documentId);
      const response = await this.request(`/storage/v1/object/list/${encodeURIComponent(this.bucket)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prefix, limit: 1000, offset: 0, sortBy: { column: "name", order: "asc" } })
      });
      const objects = await response.json();
      keys = (Array.isArray(objects) ? objects : [])
        .map((object) => String(object?.name || ""))
        .filter(Boolean)
        .map((name) => name.startsWith(`${prefix}/`) ? cleanStorageKey(name) : `${prefix}/${cleanSegment(name)}`);
    }
    if (!keys.length) return;
    await this.request(`/storage/v1/object/${encodeURIComponent(this.bucket)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefixes: keys })
    });
  }
}

export function createObjectStore({ objectDir, supabaseUrl = "", serviceRoleKey = "", bucket = "", fetchImpl } = {}) {
  const remoteValues = [supabaseUrl, serviceRoleKey, bucket].map((value) => String(value || "").trim());
  const remoteRequested = remoteValues.some(Boolean);
  if (remoteRequested && remoteValues.some((value) => !value)) {
    throw new Error("Supabase object storage requires URL, service role key, and bucket.");
  }
  if (remoteRequested) {
    return new SupabaseObjectStore({
      url: remoteValues[0],
      serviceRoleKey: remoteValues[1],
      bucket: remoteValues[2],
      fetchImpl
    });
  }
  return new LocalObjectStore(objectDir);
}
