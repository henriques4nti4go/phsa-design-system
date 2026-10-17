import tokens from "./tokens.css?inline";

// Injeta os tokens no documento uma única vez, mesmo com duas cópias do pacote.
const KEY = Symbol.for("phsa.tokens");
const scope = globalThis as typeof globalThis & { [KEY]?: true };

if (typeof document !== "undefined" && !scope[KEY]) {
  scope[KEY] = true;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(tokens);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
}
