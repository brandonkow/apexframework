import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const repo = fileURLToPath(new URL("../", import.meta.url));

export function isolatedTestEnvironment(parent, directory) {
  const env = Object.fromEntries(Object.entries(parent).filter(([key]) => !/^(APEX_|ESTATELAB_|LLM_|OPENAI_|OPENROUTER_|DATABASE_URL$|PG|VERCEL|RENDER|PORT$|HOST$|NODE_OPTIONS$)/i.test(key)));
  return { ...env, ESTATELAB_DISABLE_ENV_FILE: "true", ESTATELAB_DATA_DIR: directory, ESTATELAB_OBJECT_DIR: path.join(directory, "objects"), HOST: "127.0.0.1" };
}

async function main() {
  const directory = await mkdtemp(path.join(tmpdir(), "apex-test-run-"));
  try {
    const files = (await readdir(path.join(repo, "tests"))).filter(name => name.endsWith(".test.js")).sort().map(name => path.join(repo, "tests", name));
    const child = spawn(process.execPath, ["--test", "--test-concurrency=1", ...process.argv.slice(2), ...files], {
      cwd: repo, env: isolatedTestEnvironment(process.env, directory), stdio: "inherit"
    });
    const [code] = await once(child, "exit");
    process.exitCode = code ?? 1;
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await main();
