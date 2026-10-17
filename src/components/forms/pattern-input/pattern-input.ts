import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./pattern-input.css?inline";

const sizes = {
  default: "ds:h-9 ds:px-3",
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  lg: "ds:h-10 ds:px-4",
};

export type PatternSize = keyof typeof sizes;
export const PATTERN_SIZES = Object.keys(sizes) as PatternSize[];

const slot = (char: string) => char === "#" || char === "A" || char === "*";

/**
 * Máscara. `#` é dígito, `A` é letra, `*` é os dois; o resto é literal.
 * `value` e o `<form>` recebem só os caracteres preenchidos (`11987654321`), sem a máscara.
 * `allow-empty` mostra o `mask` nos espaços que ainda faltam.
 *
 * @tag phsa-pattern-input
 * @csspart input - O `<input>` visível.
 */
export class PhsaPatternInput extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: PatternSize = "default";
  @property() placeholder = "";
  /** Ex.: `(##) #####-####` ou `###.###.###-##`. */
  @property() format = "";
  @property() mask = "_";
  @property({ type: Boolean, attribute: "allow-empty" }) allowEmpty = false;
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=input]") ?? null;
  }

  /**
   * Último texto escrito no `<input>` visível, base para descobrir o que foi editado.
   * @ignore
   */
  private shown = "";

  /** @ignore */
  protected override syncControlValue() {
    const raw = parseText(String(this.value ?? ""), this.format);
    if (raw !== this.value) {
      this.value = raw;
      return;
    }
    const hidden = this.control;
    const visible = this.visibleInput();
    if (hidden) {
      if (hidden.value !== raw) hidden.value = raw;
      const message = this.customError();
      if (hidden.validationMessage !== message) hidden.setCustomValidity(message);
    }
    if (!visible) return;
    const display = fillFormat(raw, this.format, this.mask, this.allowEmpty);
    if (visible.value !== display) {
      visible.value = display;
      // Valor trocado por código com o campo focado: o cursor vai para o fim do preenchido.
      if (visible === this.shadowRoot?.activeElement) {
        const pos = Math.min(caretPos(this.format, raw.length, this.allowEmpty), display.length);
        visible.setSelectionRange(pos, pos);
      }
    }
    this.shown = display;
  }

  /** @ignore */
  protected override readControlValue() {
    const visible = this.visibleInput();
    if (!visible) return;
    const text = visible.value;
    const prev = String(this.value ?? "");
    let raw = prev;
    let caret = -1;
    if (!this.format) raw = text;
    else if (text !== this.shown) [raw, caret] = editRaw(this.shown, text, prev, this.format, this.inputType);
    const display = fillFormat(raw, this.format, this.mask, this.allowEmpty);
    this.value = raw;
    this.shown = display;
    if (text === display) return;
    visible.value = display;
    if (caret < 0) caret = raw.length;
    const pos = Math.min(caretPos(this.format, caret, this.allowEmpty), display.length);
    visible.setSelectionRange(pos, pos);
  }

  /** @ignore */
  private inputType = "";

  /** @ignore */
  private onInput(event: InputEvent) {
    // Durante a composição (IME) o texto ainda não é final.
    if (event.isComposing) return;
    this.inputType = event.inputType ?? "";
    this.handleInput();
    this.inputType = "";
  }

  /** @ignore */
  private visibleInput() {
    return this.renderRoot?.querySelector<HTMLInputElement>("[part=input]") ?? null;
  }

  /** @ignore */
  private customError() {
    const slots = slotCount(this.format);
    if (this.value && slots && this.value.length < slots) return `Preencha no formato ${this.format}.`;
    return "";
  }

  /** @ignore */
  private onFocus() {
    const visible = this.visibleInput();
    if (!visible) return;
    const display = fillFormat(this.value, this.format, this.mask, this.allowEmpty);
    if (visible.value !== display) visible.value = display;
    this.shown = display;
    const pos = Math.min(caretPos(this.format, this.value.length, this.allowEmpty), display.length);
    visible.setSelectionRange(pos, pos);
  }

  render() {
    return html`
      <input
        part="input"
        class="phsa-root ds:block ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:py-1 ds:shadow-sm ds:transition-colors ds:outline-none ds:placeholder:text-muted-foreground ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        inputmode=${this.format.includes("A") || this.format.includes("*") ? "text" : "numeric"}
        autocomplete="off"
        spellcheck="false"
        placeholder=${ifDefined(this.allowEmpty ? undefined : this.placeholder || undefined)}
        aria-label=${ifDefined(this.fieldLabel || undefined)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        ?readonly=${this.readOnly}
        @focus=${this.onFocus}
        @input=${this.onInput}
        @compositionend=${() => this.handleInput()}
        @change=${this.handleChange}
        @blur=${this.handleBlur}
      />
      <input
        data-control
        class="ds:sr-only"
        tabindex="-1"
        aria-hidden="true"
        ?required=${this.required}
        ?disabled=${this.isDisabled}
        ?readonly=${this.readOnly}
      />
      ${this.renderDescription()}
    `;
  }
}

function slotCount(format: string) {
  return [...format].filter(slot).length;
}

function fit(token: string, char: string) {
  if (token === "#") return /\d/.test(char) ? char : "";
  if (token === "A") return /[a-zA-Z]/.test(char) ? char.toUpperCase() : "";
  if (token === "*") return /[0-9a-zA-Z]/.test(char) ? char : "";
  return "";
}

/** Quantos slots existem antes da posição `pos` do formato. */
function slotsBefore(format: string, pos: number) {
  return slotCount(format.slice(0, pos));
}

// Varredura solta: cada caractere válido ocupa o próximo slot, a partir do slot `from`.
function scan(text: string, format: string, from: number) {
  const tokens = [...format].filter(slot).slice(from);
  let out = "";
  for (const char of text) {
    if (out.length >= tokens.length) break;
    out += fit(tokens[out.length], char);
  }
  return out;
}

// Alinhada: anda no formato a partir da posição `start` e pula os literais que o texto repete.
function align(text: string, format: string, start: number) {
  let out = "";
  let j = start;
  for (const char of text) {
    while (j < format.length && !slot(format[j]) && format[j].toLowerCase() !== char.toLowerCase()) j++;
    if (j >= format.length) break;
    if (!slot(format[j])) {
      j++;
      continue;
    }
    const value = fit(format[j], char);
    if (value) {
      out += value;
      j++;
    }
  }
  return out;
}

/**
 * Texto livre (colado, valor por código) para os caracteres dos slots.
 * Com pontuação, ou com mais caracteres do que slots livres, o texto traz os literais do formato.
 */
function parseText(text: string, format: string, start = 0, from = slotsBefore(format, start)) {
  if (!format) return text;
  const valid = text.match(/[0-9a-zA-Z]/g)?.length ?? 0;
  const free = slotCount(format) - from;
  return /[^0-9a-zA-Z]/.test(text) || valid > free ? align(text, format, start) : scan(text, format, from);
}

/** Aplica a edição (`before` -> `text`) sobre o valor `prev`. Devolve o novo valor e o slot do cursor. */
function editRaw(before: string, text: string, prev: string, format: string, inputType: string): [string, number] {
  const max = Math.min(before.length, text.length);
  let head = 0;
  while (head < max && before[head] === text[head]) head++;
  let tail = 0;
  while (tail < max - head && before[before.length - 1 - tail] === text[text.length - 1 - tail]) tail++;
  const inserted = text.slice(head, text.length - tail);
  const from = Math.min(slotsBefore(format, head), prev.length);
  const to = Math.min(slotsBefore(format, before.length - tail), prev.length);
  const typed = inserted ? parseText(inserted, format, head, from) : "";
  const raw = (prev.slice(0, from) + typed + prev.slice(to)).slice(0, slotCount(format));
  if (raw !== prev || inserted) return [raw, Math.min(from + typed.length, raw.length)];
  // Só um literal (ou a máscara) saiu: apaga o slot vizinho.
  if (inputType === "deleteContentBackward" && from > 0) return [prev.slice(0, from - 1) + prev.slice(from), from - 1];
  if (inputType === "deleteContentForward" && to < prev.length) return [prev.slice(0, to) + prev.slice(to + 1), to];
  return [prev, from];
}

function fillFormat(raw: string, format: string, mask: string, showRest: boolean) {
  if (!format) return raw;
  if (!raw && !showRest) return "";
  let index = 0;
  let out = "";
  for (const token of format) {
    if (!slot(token)) {
      if (showRest || index < raw.length) out += token;
      else break;
      continue;
    }
    if (index >= raw.length) {
      if (!showRest) break;
      out += mask || "";
      continue;
    }
    out += raw[index++];
  }
  return out;
}

function caretPos(format: string, rawLength: number, showRest: boolean) {
  if (!format) return rawLength;
  if (rawLength === 0) return Math.max(0, format.search(/[#A*]/));
  let filled = 0;
  for (let i = 0; i < format.length; i++) {
    if (!slot(format[i])) continue;
    filled++;
    if (filled === rawLength) {
      let end = i + 1;
      while (end < format.length && !slot(format[end])) end++;
      return end;
    }
  }
  return format.length;
}
