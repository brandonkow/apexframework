import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = path.dirname(fileURLToPath(import.meta.url));

function unquote(value) {
  const clean = String(value || "").trim();
  if (clean.length < 2) return clean;
  const quote = clean[0];
  if (!["\"", "'"].includes(quote) || clean.at(-1) !== quote) return clean.replace(/\s+#.*$/, "").trim();
  const inner = clean.slice(1, -1);
  if (quote === "'") return inner;
  return inner.replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t").replace(/\\\"/g, "\"").replace(/\\\\/g, "\\");
}

export function parseEnvironmentFile(contents) {
  const values = {};
  for (const rawLine of String(contents || "").replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const candidate = line.replace(/^export\s+/, "");
    const separator = candidate.indexOf("=");
    if (separator < 1) continue;
    const key = candidate.slice(0, separator).trim();
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) continue;
    values[key] = unquote(candidate.slice(separator + 1));
  }
  return values;
}

export function loadLocalEnvironment(filePath = path.join(repoDir, ".env")) {
  if (String(globalThis.process?.env?.ESTATELAB_DISABLE_ENV_FILE || "").toLowerCase() === "true") return { loaded: false, count: 0 };
  let parsed;
  try {
    parsed = parseEnvironmentFile(readFileSync(filePath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return { loaded: false, count: 0 };
    throw error;
  }
  let count = 0;
  for (const [key, value] of Object.entries(parsed)) {
    if (globalThis.process.env[key] !== undefined) continue;
    globalThis.process.env[key] = value;
    count += 1;
  }
  return { loaded: true, count };
}
