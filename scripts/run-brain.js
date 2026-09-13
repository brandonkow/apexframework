import { createReadStream } from "node:fs";

class RunnerInputError extends Error {}

const help = `Apex database-free assessment runner

Usage:
  node scripts/run-brain.js --file examples/engine-candidate.json [--text]
  Get-Content -Raw .\\candidate.json | node scripts/run-brain.js [--text]
  node scripts/run-brain.js --schema

Reads one JSON candidate (maximum 256 KiB). Prints JSON by default.
No database, server, account, LLM call or saved memory is created.
--schema lists the existing supported fields and evidence checkpoints.
--text prints a readable review; JSON retains the full calculation trace.
Exit 0 means evaluation completed, not that a property is approved.
Exit 1 means invalid input or execution failure.
`;

async function run() {
  const args = process.argv.slice(2);
  if (args.length === 1 && ["--help", "-h"].includes(args[0])) { process.stdout.write(help); return; }
  let file, text = false, schema = false;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (arg === "--file" && file === undefined && args[index + 1] && !args[index + 1].startsWith("--")) file = args[++index];
    else if (arg === "--text" && !text) text = true;
    else if (arg === "--schema" && !schema) schema = true;
    else throw new RunnerInputError("Invalid arguments. Use --help for supported options.");
  }
  if (schema && (file !== undefined || text)) throw new RunnerInputError("Use --schema by itself.");

  // CLI evaluation never needs the application's .env or any of its credentials.
  process.env.ESTATELAB_DISABLE_ENV_FILE = "true";
  const { evaluateBrain, formatBrainReview, engineInputSchema, ENGINE_INPUT_LIMIT } = await import("../brain-engine.js");
  if (schema) { process.stdout.write(`${JSON.stringify(engineInputSchema(), null, 2)}\n`); return; }
  if (file === undefined && process.stdin.isTTY) throw new RunnerInputError("Provide --file or pipe a JSON candidate through stdin. Use --help for examples.");
  const source = file === undefined ? process.stdin : createReadStream(file);
  let length = 0;
  const chunks = [];
  for await (const chunk of source) {
    length += chunk.length;
    if (length > ENGINE_INPUT_LIMIT) throw new RunnerInputError("Input exceeds 256 KiB.");
    chunks.push(chunk);
  }
  let input;
  try {
    const json = new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)).replace(/^\uFEFF/, "");
    input = JSON.parse(json);
  } catch { throw new RunnerInputError("Input must be one valid UTF-8 JSON object. See --help for examples."); }
  const result = evaluateBrain(input);
  process.stdout.write(`${text ? formatBrainReview(result) : JSON.stringify(result, null, 2)}\n`);
}

run().catch(error => {
  // Do not echo filesystem paths, raw financial input, credentials or stack traces.
  const message = ["ENOENT", "EACCES", "EISDIR", "EPERM"].includes(error.code)
    ? "Unable to read the input file. Check its path and permissions."
    : error.name === "EngineInputError" || error instanceof RunnerInputError
      ? error.message : "Unable to evaluate this candidate.";
  process.stderr.write(`Apex engine: ${message}\n`);
  process.exitCode = 1;
});
