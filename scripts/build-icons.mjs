import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Um arquivo por ícone do Lucide em dist/icons: `@phsa.tec/.../icons/mail` carrega só o Mail,
// sem barrel com todos (que deixaria o dev server lento) e sem o projeto instalar o lucide.
const require = createRequire(import.meta.url);
const source = resolve(dirname(require.resolve("lucide/package.json")), "dist/esm/icons");
const { version } = JSON.parse(readFileSync(resolve(source, "../../../package.json"), "utf8"));
const out = resolve(import.meta.dirname, "../dist/icons");

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const license = `/** Lucide v${version} — ISC License — https://lucide.dev/license */\n`;
let count = 0;

for (const file of readdirSync(source).filter((f) => f.endsWith(".mjs"))) {
  const code = readFileSync(resolve(source, file), "utf8");
  const name = code.match(/^const (\w+) =/m)?.[1];
  const { default: icon } = await import(pathToFileURL(resolve(source, file)).href);
  if (!name || !Array.isArray(icon)) throw new Error(`Formato inesperado em lucide/${file}`);
  const node = JSON.stringify(icon);
  const base = file.replace(/\.mjs$/, "");

  writeFileSync(resolve(out, `${base}.js`), `${license}export const ${name} = ${node};\nexport default ${name};\n`);
  writeFileSync(
    resolve(out, `${base}.d.ts`),
    `import type { IconNode } from "../types/core/icon";\nexport declare const ${name}: IconNode;\nexport default ${name};\n`,
  );
  count++;
}

console.log(`build-icons: ${count} ícones em dist/icons`);
