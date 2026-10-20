# PHSA Design System

**Fully isolated UI components built as Web Components ([Lit](https://lit.dev)), styled with Tailwind CSS v4 — install, import, done.**

📖 **[Storybook — live docs and playground](https://henriques4nti4go.github.io/phsa-design-system/)**

Every component renders inside its own Shadow DOM with its own compiled Tailwind styles. Your app's CSS can't break the components, and the components' CSS never leaks into your app. There is no Tailwind config to extend, no global stylesheet to import and no build plugin to set up.

```tsx
import "@phsa.tec/design-system-react/button";

<phsa-button variant="outline">Save</phsa-button>
```

## Why

Component libraries built on top of a utility framework usually leak in both directions: the host app's global styles, resets and Tailwind version end up deciding how the components look, and the library forces its own config onto the app. This design system takes the opposite approach:

- **100% isolated** — Shadow DOM keeps page CSS out and component CSS in. Even hostile global rules (`button { background: red }`, `* { font-family: ... }`) don't touch the components.
- **Zero config** — no `tailwind.config`, no `styles.css`, no `transpilePackages`. Theme tokens are injected automatically on first import.
- **Pay for what you use** — one entry point per component. Importing `/button` doesn't pull in the date picker.
- **Still Tailwind-friendly** — pass Tailwind classes from *your* project straight to a component and they apply, like `className` on a regular element ([how it works](#customizing-with-tailwind-classes)).
- **Native forms** — form fields are form-associated custom elements: `FormData`, `required` and native validation, `reset`, `<fieldset disabled>` and `input`/`change` events all work like built-in inputs.
- **Framework agnostic** — plain custom elements. Tested with React 19 and Next.js 16 (including SSR); usable from Vue, Svelte, Angular or plain HTML.

## Installation

```sh
npm install @phsa.tec/design-system-react
```

> **Note:** versions `0.x` are the previous React/shadcn implementation and have a different API.

## Quick start

Import each component you use once (its import registers the custom element), then use the tag anywhere.

### Plain HTML / any framework

```html
<script type="module">
  import "@phsa.tec/design-system-react/input";
  import "@phsa.tec/design-system-react/button";
</script>

<form>
  <phsa-input name="email" type="email" label="Email" description="We'll use it to sign you in" required></phsa-input>
  <phsa-button type="submit">Sign in</phsa-button>
</form>
```

### React / Next.js

There are two ways to use the components in React. Both render the same isolated Web Component.

**React components** — import from `/react` for regular PascalCase components, with every component event available as a prop. Works with React 18 and 19:

```tsx
"use client";

import { Button, Input, Tabs, Tab, TabPanel } from "@phsa.tec/design-system-react/react";

<Input label="Name" value={name} errors={errors} onInput={(e) => setName((e.target as HTMLInputElement).value)} />

<Tabs onPhsaChange={(e) => setTab((e as CustomEvent<{ value: string }>).detail.value)}>
  <Tab slot="tab" value="account">Account</Tab>
  <TabPanel value="account">…</TabPanel>
</Tabs>
```

Only the components you import end up in your bundle: each wrapper is its own module, so bundlers drop the ones you don't use. Event props follow the event names: `close` → `onClose`, `phsa-confirm` → `onPhsaConfirm`, plus `onInput` / `onChange` on every component.

The `/react` components are client components (`"use client"` is built in), so they can be rendered directly in a Next.js Server Component. Add `"use client"` to your own file only when it uses state, effects or event handlers.

**Custom element tags** — React 19 also supports custom elements natively, so you can use the tags directly after importing the component:

```tsx
"use client";

import { useRef, useState } from "react";
import "@phsa.tec/design-system-react/input";
import "@phsa.tec/design-system-react/dialog";
import type { PhsaDialog } from "@phsa.tec/design-system-react/dialog";

export function Profile() {
  const [name, setName] = useState("");
  const dialog = useRef<PhsaDialog>(null);

  return (
    <>
      <phsa-input value={name} onInput={(e) => setName(e.currentTarget.value)} />
      <phsa-button onClick={() => dialog.current?.show()}>Edit</phsa-button>
      <phsa-dialog ref={dialog} heading="Edit profile">…</phsa-dialog>
    </>
  );
}
```

- **Types:** importing a component also types its tag in JSX — props, variant unions and `e.currentTarget` included. Requires `@types/react` 19.
- **Events:** `onInput` and `onChange` behave like on native inputs. Custom events (`phsa-change`, `phsa-select`) are available through `ref` + `addEventListener`.
- **Methods** such as `show()` / `close()` are called through a `ref` typed with the exported class.
- **SSR:** components can be imported on the server without errors and hydrate without mismatches.
- **Form reset:** like native inputs, `form.reset()` doesn't fire `input`/`change`. Clear controlled React state in the form's `onReset`.

## Customizing

### With Tailwind classes

If your project uses **Tailwind CSS v4**, classes you put on a component are applied to it and take precedence over the component's defaults:

```html
<phsa-button class="h-12 rounded-full bg-emerald-600 px-8 hover:bg-emerald-700">Get started</phsa-button>
```

```tsx
<phsa-input className="w-64" />
```

How it works: the library copies **only the `@layer utilities` rules** of your page's CSS into a single stylesheet shared by all shadow roots, and keeps it in sync as new CSS loads. Your resets, base styles and component CSS stay outside. Internal component classes are prefixed (`ds:bg-primary`), so your own `.bg-primary` never collides with them. The host element uses `display: contents` and forwards its `class` to the component's root element.

Limitations: requires Tailwind v4 in the host project (without it, `class` is simply ignored), cross-origin stylesheets can't be read, and variants that depend on ancestors (`group-*`, class-based `dark:`) don't cross the shadow boundary.

### Theme tokens

Design tokens are CSS custom properties, which pierce the Shadow DOM. Override any of them anywhere in your CSS:

```css
:root {
  --phsa-primary: oklch(0.55 0.22 264);
  --phsa-radius: 0.375rem;
}
```

| Token | Purpose |
|---|---|
| `--phsa-font-sans` | Font family |
| `--phsa-radius` | Base border radius (sm/md/lg/xl are derived from it) |
| `--phsa-background`, `--phsa-foreground` | Surface and text |
| `--phsa-primary`, `--phsa-secondary`, `--phsa-muted`, `--phsa-accent` | Brand and neutral colors (each with a `-foreground` pair) |
| `--phsa-destructive`, `--phsa-success`, `--phsa-warning`, `--phsa-info` | Status colors (each with a `-foreground` pair) |
| `--phsa-border`, `--phsa-input`, `--phsa-ring` | Borders, field borders and focus ring |
| `--phsa-color-scheme` | `light` or `dark`: native UI inside the components (autofill, scrollbars) |

Tokens are injected with zero specificity (`:where(:root)`), so any rule you write wins. Tokens can also be scoped: set them on a container to theme just that part of the page.

### Dark mode

Add the `dark` class or `data-theme="dark"` to any ancestor (usually `<html>`).

### CSS parts

Components expose their inner elements as [CSS parts](https://developer.mozilla.org/docs/Web/CSS/::part) for one-off tweaks (the part names are listed in Storybook's docs tab for each component):

```css
phsa-input::part(input) {
  letter-spacing: 0.05em;
}
```

## Components

Each component is imported from its own entry point: `@phsa.tec/design-system-react/<name>`.

### Actions

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-button>` | `/button` | `variant` (default, secondary, outline, destructive, ghost, link), `size` (default, sm, lg, icon), `disabled`, `loading`, `block` (full width), `type` (submit, button, reset) |
| `<phsa-toggle>` | `/toggle` | `pressed`, `value`, `variant`, `size`, `disabled`; includes `phsa-toggle-group` with `type` (single, multiple) |

### Forms

Every form field accepts `label`, `description`, `error` (a single message) and `errors` (a list — a JSON array when set as an attribute). Without `error`/`errors`, a field shows the browser's own validation message after a submit attempt or when it loses focus, and clears it once the value is valid. On checkboxes and switches, `label` is the text next to the control.

```html
<phsa-input label="Password" type="password" errors='["At least 8 characters", "Must include a number"]'></phsa-input>
```

```tsx
<Input label="Name" error={formErrors.name} />
<Input label="Password" errors={["At least 8 characters", "Must include a number"]} />
```

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-input>` | `/input` | `size` (default, sm, lg), `type`, `value`, `placeholder`, `prefix`, `suffix`, `clearable`, `name`, `disabled`, `required`, `readonly`, `invalid` and the native input constraints |
| `<phsa-textarea>` | `/textarea` | `size`, `rows`, `value`, `placeholder`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-checkbox>` | `/checkbox` | `checked`, `value` (submitted only when checked, defaults to `on`), `name`, `disabled`, `required`, `invalid` |
| `<phsa-switch>` | `/switch` | Same as checkbox, rendered as a toggle switch |
| `<phsa-radio-group>` | `/radio-group` | `value`, `name`, `orientation` (vertical, horizontal), `disabled`, `required`, `invalid` |
| `<phsa-radio>` | `/radio` | `value`, `checked`, `disabled` — child of `<phsa-radio-group>` |
| `<phsa-select>` | `/select` | `<option>` / `<optgroup>` children; `value`, `multiple`, `searchable`, `placeholder`, `size`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-combobox>` | `/combobox` | `<option>` / `<optgroup>` children; filters as you type; `value`, `placeholder`, `size`, `name`, `disabled`, `required`, `readonly`, `invalid` |
| `<phsa-numeric-input>` | `/numeric-input` | Canonical `value` (`1234.5`) with formatted display; `prefix`, `suffix`, `thousand-separator`, `decimal-separator`, `decimal-scale`, `allow-negative`, `min`, `max` |
| `<phsa-pattern-input>` | `/pattern-input` | `format` (`#` digit, `A` letter, `*` either), e.g. `(##) #####-####`; `value` without the mask; `mask`, `allow-empty` |
| `<phsa-date-picker>` | `/date-picker` | `mode` (single, range, multiple), `value` (`YYYY-MM-DD`, ranges as `start/end`, multiple comma-separated), `min`, `max`, `disabled-dates` |
| `<phsa-file-upload>` | `/file-upload` | `files`, `accept`, `multiple`, `name`, `disabled`, `required`; supports drag and drop |
| `<phsa-slider>` | `/slider` | `value`, `min`, `max`, `step`, `show-value`, `name`, `disabled` |
| `<phsa-time-picker>` | `/time-picker` | `value`, `min`, `max`, `step`, `size`, `name`, `disabled`, `required`, `readonly` |
| `<phsa-otp-input>` | `/otp-input` | `value`, `length`, `type` (numeric, alphanumeric), `mask`, `name`, `disabled`, `required` |
| `<phsa-rating>` | `/rating` | `value`, `max`, `clearable`, `readonly`, `name`, `disabled`, `required` |
| `<phsa-range-slider>` | `/range-slider` | `value` (`mínimo/máximo`), `min`, `max`, `step`, `show-values`, `name`, `disabled` |

### Feedback

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-alert>` | `/alert` | `variant` (default, destructive, success, warning, info), `heading`, `description`, `dismissible` |
| `<phsa-dialog>` | `/dialog` | `open`, `heading`, `description`, `size` (sm, default, lg, xl, full), `responsive-fullscreen`; `show()` / `close()` |
| `<phsa-alert-dialog>` | `/alert-dialog` | Confirmation dialog: `confirm-label`, `cancel-label`, `variant` (default, destructive); doesn't close on backdrop click |
| `<phsa-toaster>` | `/toast` | `position` (top-right, top-left, bottom-right, bottom-left); helpers accept `duration` and `action` |
| `<phsa-progress>` | `/progress` | `value`, `max`, `label`; without `value`, displays indeterminate progress |
| `<phsa-spinner>` | `/spinner` | `size` (sm, default, lg), `label` |
| `<phsa-sheet>` | `/sheet` | Side panel with `side` (right, left, top, bottom), the dialog slots and `show()` / `close()` |

### Overlays

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-popover>` | `/popover` | `open`, `side` (top, right, bottom, left), `align` (start, center, end); `show()` / `hide()` / `toggle()` |
| `<phsa-dropdown-menu>` | `/dropdown-menu` | Same as popover; `phsa-dropdown-item` (`value`, `disabled`, `variant`) and `phsa-dropdown-separator` children |
| `<phsa-tooltip>` | `/tooltip` | `text`, `side`; shown on hover and focus of the `trigger` slot |
| `<phsa-command>` | `/command` | `placeholder`; `phsa-command-group` (`label`), `phsa-command-item` (`value`, `disabled`) and `phsa-command-separator` children; `phsa-select` event |
| `<phsa-context-menu>` | `/context-menu` | Opens at the pointer with right click; uses `phsa-dropdown-item` and emits `phsa-select` |
| `<phsa-hover-card>` | `/hover-card` | `open`, `side`, `align`; shown on hover and focus of the `trigger` slot |

### Navigation

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-breadcrumb>` | `/breadcrumb` | `label`; `phsa-breadcrumb-item` children support `href`, `target`, `current` |
| `<phsa-pagination>` | `/pagination` | `page`, `page-count`, `sibling-count`, `disabled`; emits `phsa-change` |
| `<phsa-menubar>` | `/menubar` | `label`; `phsa-menubar-menu` children with `label` use `phsa-dropdown-item` |
| `<phsa-navigation-menu>` | `/navigation-menu` | `label`; `phsa-navigation-menu-item` children with `href` or `label` + panel |
| `<phsa-link>` | `/link` | `href`, `target`, `rel`, `variant` (default, muted, inherit), `size` (inherit, sm, default, lg); call `preventDefault()` on `click` to route client-side |

### Page layout & typography

Build whole pages without writing CSS. Spacing props use one scale: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-stack>` | `/stack` | `direction` (column, row), `gap`, `align` (stretch, start, center, end, baseline), `justify` (start, center, end, between), `wrap`, `padding`, `background` (none, background, muted, primary, secondary, accent — with a matching text color), `radius`, `bordered`, `max-width` (xs … 6xl, centered), `min-height` (full, screen), `grow`, `hide-below` (sm, md, lg), `as` (div, main, section, header, footer, nav, aside, article) |
| `<phsa-grid>` | `/grid` | `columns` (1–6, 12), `min-item-width` (auto-fit, e.g. `16rem`), `gap`, `align`, `stack-below` (sm, md, lg — one column below it), `min-height`, `as` |
| `<phsa-text>` | `/text` | `variant` (display, h1, h2, h3, h4, lead, body, small — picks the element), `weight`, `tone` (inherit, default, muted, primary, destructive, success, warning, info), `align`, `truncate`, `as` |

```tsx
<Grid as="main" columns={2} stackBelow="md" minHeight="screen" gap="none">
  <Stack background="primary" padding="2xl" hideBelow="md">…</Stack>
  <Stack padding="xl" align="center" justify="center">
    <Stack maxWidth="sm" gap="lg">
      <Text variant="h1">Sign in</Text>
      <Text tone="muted">Welcome back.</Text>
      <Button block>Continue</Button>
    </Stack>
  </Stack>
</Grid>
```

Text color is inherited by default, so a `phsa-text` inside a `phsa-stack` with `background="primary"` reads correctly without extra props.

### Icons

Every [Lucide](https://lucide.dev/icons) icon ships inside the package, one file per icon: only the icons you import reach the bundle, with no barrel to slow down the dev server and nothing extra to install or configure. The file name is the icon name on lucide.dev.

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-icon>` | `/icon` | `.icon` (property), `size` (xs 12px, sm 16px, md 20px, lg 24px, xl 32px), `tone` (inherit, default, muted, primary, destructive, success, warning, info), `stroke-width`, `label` (without it the icon is `aria-hidden`) |

```tsx
import { Icon } from "@phsa.tec/design-system-react/react";
import { Mail } from "@phsa.tec/design-system-react/icons/mail";

<Icon icon={Mail} size="md" tone="muted" />
<Input label="E-mail"><Icon slot="prefix" icon={Mail} /></Input>
```

In React, `Icon` renders a plain `<svg>` (not a custom element), so it is in the server-rendered HTML and needs no JS to show. Size, color and stroke are inline styles, so global CSS like `svg { … }` does not change it. In plain HTML or Lit, set the property: `el.icon = Mail` or `<phsa-icon .icon=${Mail}>`.

### Layout & data display

| Tag | Import | Attributes |
|---|---|---|
| `<phsa-card>` | `/card` | `heading`, `description`; `media` slot for a top image, `footer` slot for actions |
| `<phsa-tabs>` | `/tabs` | `value`, `orientation` (horizontal, vertical); `phsa-tab` and `phsa-tab-panel` children |
| `<phsa-accordion>` | `/accordion` | `type` (single, multiple), `value`; `phsa-accordion-item` children |
| `<phsa-stepper>` | `/stepper` | `value`, `orientation` (horizontal, vertical); `phsa-step` children with `value`, `heading`, `description`, `disabled` |
| `<phsa-separator>` | `/separator` | `orientation` (horizontal, vertical), `decorative`, `label` |
| `<phsa-collapsible>` | `/collapsible` | `open`, `heading`, `disabled`; `toggle()` |
| `<phsa-aspect-ratio>` | `/aspect-ratio` | `ratio` (`16/9` or a number) |
| `<phsa-scroll-area>` | `/scroll-area` | `orientation` (vertical, horizontal, both); size via host classes (`h-48`, …) |
| `<phsa-badge>` | `/badge` | `variant` (default, secondary, destructive, outline, success, warning, info) |
| `<phsa-table>` | `/table` | `caption`, `loading`, `selectable`, `sort-key`, `sort-direction`, `sticky-header`; columns support `key`, `label`, `sortable`, `align`, `width`; rows support `value`, `selected`, `disabled` |
| `<phsa-skeleton>` | `/skeleton` | `variant` (text, circular, rectangular), `animated` |
| `<phsa-avatar>` | `/avatar` | `src`, `alt`, `name`, `size`, `shape`; includes `phsa-avatar-group` |
| `<phsa-empty-state>` | `/empty-state` | `heading`, `description`; slots for icon, content and actions |

The full API of every component (attributes, properties, events, slots and CSS parts) is in [Storybook](https://henriques4nti4go.github.io/phsa-design-system/), generated from the source.

## Examples

**Form with validation** — fields show the browser's own validation messages after a submit attempt, and clear them as the user fixes the value:

```html
<form>
  <phsa-input name="name" label="Name" required minlength="3"></phsa-input>
  <phsa-pattern-input name="phone" label="Phone" format="(##) #####-####"></phsa-pattern-input>

  <phsa-radio-group name="plan" label="Plan" required>
    <phsa-radio value="free">Free</phsa-radio>
    <phsa-radio value="pro">Pro</phsa-radio>
  </phsa-radio-group>

  <phsa-checkbox name="terms" required>I accept the terms</phsa-checkbox>
  <phsa-button type="submit">Create account</phsa-button>
</form>
```

**Dialog:**

```html
<phsa-dialog id="profile" heading="Edit profile" description="Update what your team sees.">
  <phsa-input name="name"></phsa-input>
  <phsa-button slot="footer" variant="outline">Cancel</phsa-button>
  <phsa-button slot="footer">Save</phsa-button>
</phsa-dialog>
```

```ts
document.querySelector("phsa-dialog")!.show();
```

**Toasts** — render one `<phsa-toaster>` and call `toast()` from anywhere:

```ts
import { toast } from "@phsa.tec/design-system-react/toast";

toast.success("Saved", { description: "Your profile was updated." });
```

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. The components rely on Shadow DOM, constructable stylesheets, `ElementInternals` (form association) and the native `<dialog>`; overlays use the Popover API when available and fall back to fixed positioning otherwise.

## Development

```sh
npm install
npm run dev              # Storybook at http://localhost:6006
npm run build            # dist/<name>/index.js + type declarations + custom-elements.json
npm run typecheck
npm run build-storybook  # static Storybook in storybook-static/
```

### Project structure

```
src/
  styles/
    tokens.css          # --phsa-* tokens, injected once into the document
    theme.css           # maps tokens to Tailwind utilities (bg-primary, rounded-md, ...)
    base.css            # preflight + root reset, inside each shadow root
    host-utilities.ts   # bridge: host project's Tailwind utilities → shadow roots
  react/                # generated React wrappers (scripts/build-react.mjs, from custom-elements.json)
  core/
    phsa-element.ts     # base class: shared styles + class forwarding
    form-control.ts     # base class for form fields (ElementInternals, validation, reset, label/errors)
    toggle.ts           # shared checkbox/switch behavior
    anchored.ts         # shared overlay positioning (popover, dropdown, tooltip)
    jsx.ts              # JSX types for every <phsa-*> tag
  components/<category>/<name>/
    <name>.ts           # the component (extends PhsaElement or PhsaFormControl)
    <name>.css          # Tailwind for this component only (@source "./<name>.ts")
    index.ts            # registers the custom element
    <name>.stories.ts
```

Adding a component means adding a folder under `src/components/<category>/`; the build and the package `exports` pick it up automatically. Categories only organize the repository: the public import is flat (`/input`, not `/forms/input`), so component names must be unique — the build fails on duplicates.

### Conventions

- Internal classes use the `ds:` prefix and the component root uses the `phsa-root` class, which resets inherited font, color and spacing.
- Don't put a static utility and a conditional one for the same CSS property in the same class list (e.g. `ds:bg-transparent` plus a conditional `ds:bg-accent`) — stylesheet order would decide the winner. Use a ternary.
- Don't reflect properties that have default values to attributes, and don't write attributes on the host when it connects: the server-rendered HTML must match the client for React hydration.
- Every component has an `Isolation` story that applies hostile page CSS to prove the component is unaffected.
- Mark internal members with `/** @ignore */` so they stay out of the generated docs.

### Implementation notes

- `postcss.config.js` converts Tailwind's `@property` rules into plain initial values, because `@property` doesn't work inside shadow roots (without it, `shadow-*`, `ring-*` and transforms break).
- `package.json` `sideEffects` includes `./src/styles/tokens.ts` and `./src/components/*/*/index.ts`; without them production builds tree-shake the token injection and the `customElements.define` calls away (the library build and the static Storybook break, while Storybook's dev server doesn't tree-shake, so it wouldn't show there).
- Component docs in Storybook come from `custom-elements.json`, generated from the source and JSDoc by `cem analyze`. The same manifest generates the React wrappers in `src/react/` (git-ignored) on every `analyze`.
- Parent components (tabs, radio group, table, command) observe their children's attributes, because frameworks may set child properties after the parent's first render.
