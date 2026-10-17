/**
 * Ponte de utilities: copia só a `@layer utilities` do Tailwind da página para uma
 * folha compartilhada por todos os shadow roots. Preflight, base e qualquer CSS
 * global continuam do lado de fora — só valem as classes passadas no componente.
 */
const KEY = Symbol.for("phsa.hostUtilities");
const scope = globalThis as typeof globalThis & { [KEY]?: CSSStyleSheet };

export const hostUtilities = typeof document === "undefined" ? undefined : (scope[KEY] ??= createBridge());

function createBridge() {
  const sheet = new CSSStyleSheet();
  let scheduled = false;

  const sync = () => {
    scheduled = false;
    const rules: string[] = [];
    for (const styleSheet of Array.from(document.styleSheets)) collectSheet(styleSheet, rules);
    sheet.replaceSync(`@layer host {\n${rules.join("\n")}\n}`);
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(sync);
  };

  // CSS que entra depois: code-splitting, HMR, <link> terminando de carregar.
  new MutationObserver(schedule).observe(document.head, { childList: true, subtree: true, characterData: true });
  document.addEventListener("load", (e) => e.target instanceof HTMLLinkElement && schedule(), true);
  sync();

  return sheet;
}

function collectSheet(styleSheet: CSSStyleSheet, out: string[]) {
  let rules: CSSRuleList;
  try {
    rules = styleSheet.cssRules;
  } catch {
    return; // CSS de outro domínio: o browser não deixa ler.
  }
  for (const rule of Array.from(rules)) {
    if (rule instanceof CSSLayerBlockRule && rule.name === "utilities") {
      for (const child of Array.from(rule.cssRules)) pushUtility(child, out);
    } else if (rule instanceof CSSImportRule && rule.styleSheet) {
      if (rule.layerName === "utilities") {
        for (const child of Array.from(rule.styleSheet.cssRules)) pushUtility(child, out);
      } else {
        collectSheet(rule.styleSheet, out);
      }
    }
  }
}

// Só regras que começam por classe: um `button {}` dentro da layer não entra.
function pushUtility(rule: CSSRule, out: string[]) {
  if (rule instanceof CSSStyleRule) {
    if (rule.selectorText.split(",").every((s) => s.trim().startsWith("."))) out.push(rule.cssText);
  } else if (rule instanceof CSSGroupingRule) {
    const inner: string[] = [];
    for (const child of Array.from(rule.cssRules)) pushUtility(child, inner);
    if (inner.length) out.push(`${rule.cssText.slice(0, rule.cssText.indexOf("{"))}{\n${inner.join("\n")}\n}`);
  }
}
