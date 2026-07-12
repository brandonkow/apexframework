import { handler } from "../server.js";

export default function vercelRouter(req, res) {
  const rawPath = req.query?.__apex_path;
  const pathParts = Array.isArray(rawPath) ? rawPath : [rawPath];
  const apiPath = pathParts.filter(Boolean).join("/");
  const url = new URL(req.url, "http://localhost");
  url.pathname = `/api/${apiPath}`;
  url.searchParams.delete("__apex_path");
  req.url = `${url.pathname}${url.search}`;
  return handler(req, res);
}
