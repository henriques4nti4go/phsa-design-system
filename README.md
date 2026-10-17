# PHSA Design System

Design system em Web Components ([Lit](https://lit.dev)) com Tailwind v4 compilado dentro de cada componente.

- **100% isolado**: cada componente renderiza em Shadow DOM; o CSS da página não entra e o do DS não sai.
- **Zero config**: instalar e importar. Sem `tailwind.config`, sem `styles.css` global.
- **Só o que usa**: um import por componente.
- **Qualquer framework**: React 19, Vue, Svelte, Angular ou HTML puro.

## Uso

```ts
import "@phsa.tec/design-system-react/button";
```

```html
<phsa-button variant="outline" size="sm">Salvar</phsa-button>
```

### React / Next.js

Funciona direto no React 19, inclusive com SSR (Next): importe o componente num client component e use a tag.

```tsx
"use client";
import "@phsa.tec/design-system-react/input";

<phsa-input name="nome" value={nome} onInput={(e) => setNome(e.currentTarget.value)} />
```

- **Tipos**: importar um componente já tipa a tag no JSX (props, variantes e `e.currentTarget`). Requer `@types/react` 19.
- **Eventos**: `onInput` e `onChange` funcionam como nos nativos. Eventos próprios (`phsa-change`, `phsa-select`) via `ref` + `addEventListener`.
- **Métodos** (`show()`, `close()`...): via `ref`, tipado com a classe exportada (`import type { PhsaDialog } from ".../dialog"`).
- **Reset de `<form>`**: como nos inputs nativos, não dispara `input`/`change`; estado controlado no React precisa ser limpo à parte (`onReset` no form).

## Customizar com classes

Em projetos com **Tailwind v4**, classes passadas no componente funcionam como `className` e vencem os estilos do DS:

```html
<phsa-button class="h-12 rounded-full bg-emerald-600 hover:bg-emerald-700">Começar</phsa-button>
```

```tsx
<phsa-button className="w-full">Salvar</phsa-button> // React 19
```

Como funciona (ponte de utilities):

- O DS copia **só** a `@layer utilities` do CSS da página para dentro dos shadow roots (uma folha compartilhada, atualizada quando entra CSS novo). Preflight, base e CSS global continuam do lado de fora.
- As classes internas do DS têm prefixo (`ds:bg-primary`), então o `.bg-primary` do projeto nunca encosta nelas — só vale o que você passa na tag.
- O host é `display: contents` e o `class` é repassado ao elemento raiz interno.

Limitações: precisa de Tailwind v4 no projeto (sem ele, o `class` é ignorado); CSS de outro domínio não pode ser lido; variants que olham ancestrais (`group-*`, `dark:` por classe) não atravessam o shadow.

## Tema

Os tokens são custom properties `--phsa-*`, que atravessam o Shadow DOM. Para customizar, sobrescreva no projeto:

```css
:root {
  --phsa-primary: oklch(0.55 0.22 264);
  --phsa-radius: 0.375rem;
}
```

Dark mode: classe `.dark` ou atributo `data-theme="dark"` em qualquer ancestral (normalmente o `<html>`).

## Componentes

| Tag | Import | Atributos |
|---|---|---|
| `<phsa-button>` | `/button` | `variant` (default, secondary, outline, destructive, ghost, link), `size` (default, sm, lg, icon), `disabled`, `type` (submit, button, reset) |
| `<phsa-input>` | `/input` | `size` (default, sm, lg), `type`, `value`, `placeholder`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-textarea>` | `/textarea` | `size`, `rows`, `value`, `placeholder`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-checkbox>` | `/checkbox` | `checked`, `value` (enviado só se marcado; padrão `on`), `name`, `disabled`, `required`, `invalid` |
| `<phsa-switch>` | `/switch` | igual ao checkbox, visual de interruptor |
| `<phsa-radio>` | `/radio` | `value`, `checked`, `disabled` — filho de `<phsa-radio-group>` |
| `<phsa-radio-group>` | `/radio-group` | `value`, `name`, `orientation` (vertical, horizontal), `disabled`, `required`, `invalid` |
| `<phsa-select>` | `/select` | filhos `<option>` / `<optgroup>`; `value`, `multiple`, `searchable`, `placeholder`, `size`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-numeric-input>` | `/numeric-input` | `value` canônico (`1234.5`); `prefix`, `suffix`, `thousand-separator`, `decimal-separator`, `decimal-scale`, `allow-negative`, `min`, `max` |
| `<phsa-pattern-input>` | `/pattern-input` | `format` (`#` dígito, `A` letra, `*` ambos); `value` sem a máscara; `mask`, `allow-empty` |
| `<phsa-date-picker>` | `/date-picker` | `mode` (single, range, multiple), `value` (`YYYY-MM-DD`, intervalo com `/`, várias com vírgula), `min`, `max`, `disabled-dates` |
| `<phsa-field>` | `/field` | `label`, `description`, `error` — envolve um campo; sem `error`, mostra a validação nativa no submit |
| `<phsa-badge>` | `/badge` | `variant` (default, secondary, destructive, outline, success, warning, info) |
| `<phsa-separator>` | `/separator` | `orientation` (horizontal, vertical), `decorative` |
| `<phsa-alert>` | `/alert` | `variant` (default, destructive, success, warning, info), `heading`, `description`, `dismissible` |
| `<phsa-dialog>` | `/dialog` | `open`, `heading`, `description`; `show()` / `close()`; fecha no overlay, no Escape e no botão |
| `<phsa-alert-dialog>` | `/alert-dialog` | confirmação: `confirm-label`, `cancel-label`, `variant` (default, destructive); não fecha no overlay |
| `<phsa-toaster>` | `/toast` | `position` (top-right, top-left, bottom-right, bottom-left); `toast()` / `toast.success()` / `toast.error()` / `toast.warning()` / `toast.info()` |
| `<phsa-card>` | `/card` | `heading`, `description`; slot `media` para a imagem no topo; slot `footer` para ações |
| `<phsa-tabs>` | `/tabs` | `value`, `orientation` (horizontal, vertical); filhos `phsa-tab` (slot `tab`) e `phsa-tab-panel` |
| `<phsa-popover>` | `/popover` | `open`, `side` (top, right, bottom, left), `align` (start, center, end); `show()` / `hide()` / `toggle()` |
| `<phsa-dropdown-menu>` | `/dropdown-menu` | igual ao popover; filhos `phsa-dropdown-item` (`value`, `disabled`, `variant`) e `phsa-dropdown-separator` |
| `<phsa-tooltip>` | `/tooltip` | `text`, `side`; aparece no hover e no foco do slot `trigger` |
| `<phsa-table>` | `/table` | `caption`; filhos `phsa-column` (`label`, `sortable`), `phsa-row` e `phsa-cell` |
| `<phsa-combobox>` | `/combobox` | filhos `<option>` / `<optgroup>`; `value` da opção, `placeholder`, `size`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-command>` | `/command` | `placeholder`; filhos `phsa-command-group` (`label`), `phsa-command-item` (`value`, `disabled`) e `phsa-command-separator`; evento `phsa-select` |

```html
<phsa-field label="E-mail" description="Usaremos para o login">
  <phsa-input name="email" type="email" required></phsa-input>
</phsa-field>
```

Campos de formulário funcionam com o `<form>` da página como os nativos: `FormData`, `required`/validação, `reset`, `<fieldset disabled>` e eventos `input`/`change`.

```html
<phsa-dialog id="perfil" heading="Editar perfil" description="Altere os dados visíveis para o time.">
  <phsa-button slot="footer" type="button" variant="outline">Cancelar</phsa-button>
  <phsa-button slot="footer" type="button">Salvar</phsa-button>
</phsa-dialog>
```

```ts
import "@phsa.tec/design-system-react/toast";
import { toast } from "@phsa.tec/design-system-react/toast";

toast.success("Dados salvos", { description: "O perfil foi atualizado." });
```

## Desenvolvimento

```sh
npm install
npm run dev              # Storybook em http://localhost:6006
npm run build            # dist/components/<nome>/index.js + .d.ts + custom-elements.json
npm run build-storybook  # storybook-static/ (publicado no GitHub Pages pelo CI, na master)
```

### Estrutura

```
src/
  styles/
    tokens.css   # --phsa-* (injetados uma vez no documento, especificidade zero)
    theme.css    # mapeia tokens → utilitários Tailwind (bg-primary, rounded-md...)
    base.css     # preflight + reset do elemento raiz, dentro do shadow
    host-utilities.ts  # ponte: utilities do Tailwind do projeto → shadow roots
  core/
    phsa-element.ts    # base dos componentes (estilos + repasse do class)
    form-control.ts    # base dos campos de formulário (ElementInternals, validação, reset)
  components/<categoria>/<nome>/   # ex.: actions/button, forms/input
    <nome>.ts    # estende PhsaElement (ou PhsaFormControl); classes internas com prefixo `ds:`
    <nome>.css   # Tailwind só deste componente (@source "./<nome>.ts")
    index.ts     # customElements.define
    <nome>.stories.ts
```

A tabela de atributos, slots e parts no Storybook vem do `custom-elements.json`, gerado do código (JSDoc) pelo `cem analyze`. Membros internos levam `/** @ignore */`.

Cada componente deve ter uma story `Isolation` aplicando CSS hostil na página, para provar que ele não é afetado.

Componente novo = nova pasta em `src/components/<categoria>/`; o build e o `exports` do pacote pegam automaticamente. As categorias só organizam o repositório: o import público é plano (`/input`, não `/forms/input`), então o nome do componente precisa ser único — o build falha se repetir. Mover um componente de categoria não quebra quem usa.

### Observações

- Os componentes não refletem atributos com valor padrão (`size="default"`, `variant`...) no host: o HTML do SSR tem que bater com o do cliente na hidratação do React.
- `sideEffects` no `package.json` inclui `./src/styles/tokens.ts`: sem isso, o build descarta a injeção dos tokens (no Storybook funciona, porque o dev não faz tree-shaking).

- O `postcss.config.js` converte os `@property` do Tailwind em valores iniciais, porque `@property` não funciona dentro de shadow root (sem isso, `shadow-*`, `ring-*` e transforms quebram).
- O elemento raiz de cada componente usa a classe `phsa-root`, que corta a herança de fonte/cor/espaçamento vinda da página.
