import { unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./text.css?inline";

// Tamanho e peso padrão de cada variante; `weight` troca só o peso.
const variants = {
  display: { tag: literal`h1`, size: "ds:text-4xl ds:leading-tight ds:tracking-tight", weight: "bold" },
  h1: { tag: literal`h1`, size: "ds:text-3xl ds:leading-tight ds:tracking-tight", weight: "bold" },
  h2: { tag: literal`h2`, size: "ds:text-2xl ds:leading-snug ds:tracking-tight", weight: "semibold" },
  h3: { tag: literal`h3`, size: "ds:text-xl ds:leading-snug", weight: "semibold" },
  h4: { tag: literal`h4`, size: "ds:text-lg ds:leading-snug", weight: "semibold" },
  lead: { tag: literal`p`, size: "ds:text-xl ds:leading-relaxed", weight: "normal" },
  body: { tag: literal`p`, size: "ds:text-sm ds:leading-normal", weight: "normal" },
  small: { tag: literal`p`, size: "ds:text-xs ds:leading-normal", weight: "normal" },
} as const;

const weights = {
  normal: "ds:font-normal",
  medium: "ds:font-medium",
  semibold: "ds:font-semibold",
  bold: "ds:font-bold",
};

const tones = {
  inherit: "ds:text-inherit",
  default: "ds:text-foreground",
  muted: "ds:text-muted-foreground",
  primary: "ds:text-primary",
  destructive: "ds:text-destructive",
  success: "ds:text-success",
  warning: "ds:text-warning",
  info: "ds:text-info",
};

const alignments = {
  start: "ds:text-start",
  center: "ds:text-center",
  end: "ds:text-end",
};

const tags = {
  p: literal`p`,
  span: literal`span`,
  div: literal`div`,
  h1: literal`h1`,
  h2: literal`h2`,
  h3: literal`h3`,
  h4: literal`h4`,
  h5: literal`h5`,
  h6: literal`h6`,
  blockquote: literal`blockquote`,
};

export type TextVariant = keyof typeof variants;
export type TextWeight = keyof typeof weights;
export type TextTone = keyof typeof tones;
export type TextAlign = keyof typeof alignments;
export type TextTag = keyof typeof tags;
export const TEXT_VARIANTS = Object.keys(variants) as TextVariant[];
export const TEXT_WEIGHTS = Object.keys(weights) as TextWeight[];
export const TEXT_TONES = Object.keys(tones) as TextTone[];
export const TEXT_ALIGNS = Object.keys(alignments) as TextAlign[];
export const TEXT_TAGS = Object.keys(tags) as TextTag[];

/**
 * Texto e títulos na escala tipográfica do DS. A variante escolhe o elemento
 * (`h1`…`h4`, `p`); `as` troca o elemento sem mudar o visual.
 *
 * Por padrão a cor é herdada: dentro de um `phsa-stack` com fundo, combina com ele.
 *
 * @tag phsa-text
 * @slot - O texto.
 * @csspart text - O elemento de texto.
 */
export class PhsaText extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() variant: TextVariant = "body";
  @property() weight: TextWeight | "" = "";
  @property() tone: TextTone = "inherit";
  @property() align: TextAlign | "" = "";
  /** Elemento renderizado, no lugar do padrão da variante. */
  @property() as: TextTag | "" = "";
  /** Corta em uma linha com reticências. */
  @property({ type: Boolean }) truncate = false;

  render() {
    const variant = variants[this.variant] ?? variants.body;
    const tag = (this.as && tags[this.as]) || variant.tag;
    const classes = [
      "phsa-root ds:block ds:m-0",
      variant.size,
      weights[this.weight || variant.weight] ?? weights.normal,
      tones[this.tone] ?? tones.inherit,
      this.align ? (alignments[this.align] ?? "") : "",
      this.truncate ? "ds:truncate" : "",
      this.hostClass,
    ];
    return html`<${tag} part="text" class=${classes.filter(Boolean).join(" ")}><slot></slot></${tag}>`;
  }
}
