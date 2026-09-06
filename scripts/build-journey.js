import { build } from "esbuild";

await build({
  entryPoints: ["ui/journey/app.js"], bundle: true, minify: true,
  format: "esm", target: ["es2022"], outfile: "public/journey/app.js",
  legalComments: "eof", loader: { ".html": "text" }
});
console.log("Built the self-hosted Apex 3D journey.");
