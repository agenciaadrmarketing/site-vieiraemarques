// Gera assets/js/*.min.js a partir dos JS legíveis (site.js e reviews.js) com o terser.
// É uma etapa de desenvolvimento (precisa de internet na 1ª vez): `npm run minify`.
// O site usa os .min.js quando existem; os arquivos legíveis continuam sendo a fonte.
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
for (const name of ["site", "reviews"]) {
  execFileSync("npx", ["--yes", "terser@5.31.6", join(ROOT, `assets/js/${name}.js`), "--compress", "--mangle", "-o", join(ROOT, `assets/js/${name}.min.js`)], { stdio: "inherit" });
  process.stdout.write(`assets/js/${name}.min.js\n`);
}
