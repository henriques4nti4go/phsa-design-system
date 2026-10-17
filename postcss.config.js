import tailwindcss from "@tailwindcss/postcss";

// `@property` é ignorado dentro de shadow root, o que quebra shadow/ring/transform
// do Tailwind v4. Converte cada registro em um valor inicial na layer `properties`.
const shadowPropertyFallback = () => ({
  postcssPlugin: "shadow-property-fallback",
  OnceExit(root, { AtRule, Rule, Declaration }) {
    if (!root.source?.input.file?.includes("/src/")) return; // só o CSS que vai para dentro do shadow
    const nodes = [];
    root.walkAtRules("property", (atRule) => {
      let value = "initial";
      atRule.walkDecls("initial-value", (decl) => {
        value = decl.value;
      });
      nodes.push(new Declaration({ prop: atRule.params.trim(), value }));
      atRule.remove();
    });
    if (!nodes.length) return;
    const rule = new Rule({ selector: ":host, *, ::before, ::after, ::backdrop", nodes });
    root.prepend(new AtRule({ name: "layer", params: "properties", nodes: [rule] }));
  },
});
shadowPropertyFallback.postcss = true;

export default {
  // optimize: false — o minify fica com o Vite (o do Tailwind gera um @layer sem ";" no fim).
  plugins: [tailwindcss({ optimize: false }), shadowPropertyFallback()],
};
