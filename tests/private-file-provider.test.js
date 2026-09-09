import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

test("private photo requests use each provider's multimodal format and never retry without a new request", async t => {
  const dir = await mkdtemp(path.join(os.tmpdir(), "apex-private-provider-")), captured = [];
  const server = http.createServer(async (req, res) => {
    const chunks = []; for await (const chunk of req) chunks.push(chunk);
    captured.push({ path: req.url, body: JSON.parse(Buffer.concat(chunks)) });
    res.writeHead(200, { "content-type": "application/json" });
    const answer = JSON.stringify({ summary: "Synthetic image fixture only.", observations: [], questions: [] });
    res.end(JSON.stringify(req.url === "/responses" ? { model: "test-model", output: [{ content: [{ type: "output_text", text: answer }] }] } : { model: "test-model", choices: [{ finish_reason: captured.length === 3 ? "length" : "stop", message: { content: answer } }] }));
  });
  server.listen(0, "127.0.0.1"); await once(server, "listening");
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(dir, { recursive: true, force: true }); });
  for (const [index, provider] of ["openrouter", "openai", "openrouter"].entries()) {
    const child = spawn(process.execPath, ["--input-type=module", "-e", `import { requestLlmText } from './server.js'; try { const result=await requestLlmText({instructions:'Synthetic private photo test',input:'test-only',inputImages:[{mimeType:'image/png',base64:'TEST_BYTES'}],privateInput:true,maxAttempts:1,maxOutputTokens:1000,validateText:()=>true}); if (${index}===2) process.exit(2); console.log(result.text); } catch(error) { if (${index}!==2) throw error; }`], { cwd: new URL("../", import.meta.url), env: { ...process.env, ESTATELAB_DATA_DIR: dir, DATABASE_URL: "", LLM_PROVIDER: provider, LLM_API_KEY: "local-test-key", LLM_MODEL: "test-model", OPENROUTER_FREE_ROUTING: "false", LLM_BASE_URL: `http://127.0.0.1:${server.address().port}` }, stdio: "pipe" });
    let error = ""; child.stderr.on("data", chunk => error += chunk); child.stdout.resume();
    const [code] = await once(child, "exit"); assert.equal(code, 0, error);
  }
  assert.equal(captured.length, 3);
  assert.equal(captured[0].path, "/chat/completions");
  assert.equal(captured[0].body.messages[1].content[1].image_url.url, "data:image/png;base64,TEST_BYTES");
  assert.equal(captured[0].body.provider.data_collection, "deny");
  assert.equal(captured[1].path, "/responses");
  assert.equal(captured[1].body.input[0].content[1].type, "input_image");
  assert.equal(captured[1].body.input[0].content[1].image_url, "data:image/png;base64,TEST_BYTES");
  assert.equal(captured[1].body.store, false);
});
