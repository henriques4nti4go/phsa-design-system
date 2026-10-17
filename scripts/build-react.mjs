import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { findComponents } from "./components.mjs";

// Gera os wrappers React (`@phsa.tec/.../react`) a partir do custom-elements.json:
// um arquivo por pasta de componente, para o bundler descartar os que não forem usados.
const root = resolve(import.meta.dirname, "..");
const out = resolve(root, "src/react");
const manifest = JSON.parse(readFileSync(resolve(root, "custom-elements.json"), "utf8"));

// Eventos internos (filho → pai), não fazem sentido como prop.
const internal = new Set(["phsa-radio", "phsa-tab-select"]);

const pascal = (text) => text.replace(/(^|-)([a-z])/g, (_, __, char) => char.toUpperCase());
const eventProp = (name) => `on${pascal(name)}`;

const declarations = manifest.modules.flatMap((mod) =>
  (mod.declarations ?? []).filter((d) => d.tagName).map((d) => ({ ...d, path: mod.path })),
);

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

const header = "// Gerado por scripts/build-react.mjs a partir do custom-elements.json. Não editar.\n";
const barrel = [];

for (const { name, category } of findComponents()) {
  const folder = `src/components/${category}/${name}/`;
  const elements = declarations.filter((d) => d.path.startsWith(folder));
  if (!elements.length) continue;

  const lines = [
    header,
    'import * as React from "react";',
    'import { createComponent } from "@lit/react";',
    `import { ${elements.map((e) => e.name).join(", ")} } from "../components/${category}/${name}";`,
    "",
  ];
  for (const element of elements) {
    const component = pascal(element.tagName.replace(/^phsa-/, ""));
    const events = { onInput: "input", onChange: "change" };
    for (const event of element.events ?? []) {
      if (event.name && !internal.has(event.name)) events[eventProp(event.name)] = event.name;
    }
    lines.push(
      `/** \`<${element.tagName}>\` como componente React. */`,
      `export const ${component} = /* @__PURE__ */ createComponent({`,
      `  tagName: "${element.tagName}",`,
      `  elementClass: ${element.name},`,
      "  react: React,",
      `  events: ${JSON.stringify(events).replace(/"(\w+)":/g, "$1: ").replace(/,/g, ", ")},`,
      `  displayName: "${component}",`,
      "});",
      "",
    );
    barrel.push(`export { ${component} } from "./${name}";`);
  }
  writeFileSync(resolve(out, `${name}.ts`), lines.join("\n"));
}

writeFileSync(resolve(out, "index.ts"), `${header}\n${barrel.join("\n")}\n`);
