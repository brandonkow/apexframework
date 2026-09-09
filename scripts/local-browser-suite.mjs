import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import net from "node:net";

for (const script of ["journey-browser-check.mjs", "journey-flow-check.mjs", "workspace-browser-check.mjs"]) {
  const dir = await mkdtemp(path.join(os.tmpdir(), "apex-compatible-browser-"));
  const probe = net.createServer(); probe.listen(0, "127.0.0.1"); await once(probe, "listening"); const port = probe.address().port; await new Promise(resolve => probe.close(resolve));
  const base = `http://127.0.0.1:${port}`;
  const env = { ...process.env, PORT: String(port), HOST: "127.0.0.1", ESTATELAB_DATA_DIR: dir, DATABASE_URL: "", VERCEL: "", OPENAI_API_KEY: "", OPENROUTER_API_KEY: "", LLM_API_KEY: "", ESTATELAB_OWNER_TOKEN: "workspace-qa-owner-secret", JOURNEY_CHECK_URL: base };
  const server = spawn(process.execPath, ["server.js"], { cwd: new URL("../", import.meta.url), env, stdio: "pipe" });
  let runner, logs = "";
  server.stderr.on("data", chunk => logs += chunk);
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) { try { if ((await fetch(base + "/api/health")).ok) { ready = true; break; } } catch {} await new Promise(resolve => setTimeout(resolve, 50)); }
    if (!ready) throw new Error("Local server unavailable: " + logs);
    runner = spawn(process.execPath, [`scripts/${script}`], { cwd: new URL("../", import.meta.url), env, stdio: "inherit" });
    const timeout = setTimeout(() => runner.kill(), 240000);
    const [code] = await once(runner, "exit"); clearTimeout(timeout);
    if (code !== 0) throw new Error(`${script} failed (${code}).`);
    console.log(`PASS ${script}`);
  } finally {
    if (runner?.exitCode === null) { const done = once(runner, "exit"); runner.kill(); await done; }
    if (server.exitCode === null) { const done = once(server, "exit"); server.kill(); await done; }
    await rm(dir, { recursive: true, force: true });
  }
}
