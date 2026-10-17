import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { findComponents } from "./components.mjs";

// O tsc gera os .d.ts espelhando src/ em dist/types; aqui cada import plano ganha o seu.
const dist = resolve(import.meta.dirname, "../dist");

for (const { name, category } of findComponents()) {
  mkdirSync(resolve(dist, name), { recursive: true });
  writeFileSync(
    resolve(dist, name, "index.d.ts"),
    `export * from "../types/components/${category}/${name}/index";\n`,
  );
}
