import { handler } from "../server.js";

export default function vercelHandler(req, res) {
  return handler(req, res);
}
