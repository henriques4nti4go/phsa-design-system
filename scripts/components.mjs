import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../src/components");

/**
 * Componentes ficam agrupados por categoria (`src/components/<categoria>/<nome>`),
 * mas o import público é plano (`@phsa.tec/.../<nome>`): o nome precisa ser único.
 */
export function findComponents() {
  const components = readdirSync(root, { withFileTypes: true })
    .filter((category) => category.isDirectory())
    .flatMap((category) =>
      readdirSync(resolve(root, category.name), { withFileTypes: true })
        .filter((dir) => dir.isDirectory() && existsSync(resolve(root, category.name, dir.name, "index.ts")))
        .map((dir) => ({ name: dir.name, category: category.name })),
    );

  const seen = new Map();
  for (const { name, category } of components) {
    if (seen.has(name)) throw new Error(`Componente "${name}" existe em "${seen.get(name)}" e "${category}"`);
    seen.set(name, category);
  }
  return components;
}
