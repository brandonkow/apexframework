import net from "node:net";

let attempts = 0;
function forbidNetwork() {
  attempts++;
  throw new Error("Engine-only evaluation attempted network access.");
}
net.Socket.prototype.connect = forbidNetwork;
globalThis.fetch = forbidNetwork;
process.on("beforeExit", () => {
  if (attempts) process.exitCode = 97;
});
