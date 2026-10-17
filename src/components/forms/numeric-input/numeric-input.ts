import { html, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./numeric-input.css?inline";

const sizes = {
  default: "ds:h-9 ds:px-3",
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  lg: "ds:h-10 ds:px-4",
};

export type NumericSize = keyof typeof sizes;
export const NUMERIC_SIZES = Object.keys(sizes) as NumericSize[];

type Opts = {
  prefix: string;
  suffix: string;
  thousand: string;
  decimal: string;
  scale: number;
  allowNegative: boolean;
};

/**
 * Número formatado. `value` e o `<form>` recebem o valor canônico (`1234.5`), sem prefixo nem separador de milhar.
 * `allow-negative="false"` bloqueia o sinal. `decimal-scale="0"` aceita só inteiros; sem o atributo, as casas são livres.
 * Com `decimal-scale`, um `value` definido por código com casas a mais é arredondado (metade para longe do zero:
 * `1.005` vira `1.01`); na digitação as casas extras só não entram. No `change` as casas faltantes são completadas com zero.
 *
 * @tag phsa-numeric-input
 * @csspart input - O `<input>` visível.
 */
export class PhsaNumericInput extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: NumericSize = "default";
  @property() placeholder = "";
  @property() prefix = "";
  @property() suffix = "";
  @property({ attribute: "thousand-separator" }) thousandSeparator = ".";
  @property({ attribute: "decimal-separator" }) decimalSeparator = ",";
  /** `-1` (padrão) não limita as casas. */
  @property({ type: Number, attribute: "decimal-scale" }) decimalScale = -1;
  /** Qualquer valor diferente de `"false"` permite negativo. */
  @property({ attribute: "allow-negative" }) allowNegative: string | boolean = "true";
  @property() min = "";
  @property() max = "";
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=input]") ?? null;
  }

  /** @ignore */
  protected override formValue() {
    return this.submitted();
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    if (!changed.has("value") && !changed.has("decimalScale")) return;
    const text = String(this.value ?? "");
    const next = this.decimalScale >= 0 ? roundScale(text, this.decimalScale) : text;
    if (next !== this.value) this.value = next;
  }

  /** @ignore */
  protected override syncFormState() {
    const range = this.rangeError();
    const control = this.control;
    const anchor = this.validityAnchor();
    if (!range || !control || !anchor || !control.willValidate) {
      super.syncFormState();
      return;
    }
    this.internals.setFormValue(this.formValue());
    this.internals.setValidity({ [range.flag]: true }, range.message, anchor);
  }

  /** @ignore */
  protected override handleChange() {
    // Completa as casas antes do `change`, para quem escuta já ver o valor final.
    this.readControlValue();
    this.padFraction();
    this.syncControlValue();
    super.handleChange();
  }

  /** @ignore */
  protected override syncControlValue() {
    const hidden = this.control;
    const visible = this.visibleInput();
    const submitted = this.submitted();
    if (hidden) {
      if (hidden.value !== submitted) hidden.value = submitted;
      const message = this.customError();
      if (hidden.validationMessage !== message) hidden.setCustomValidity(message);
    }
    if (!visible) return;
    const display = formatNumeric(this.value, this.opts());
    if (visible.value !== display) visible.value = display;
  }

  /** @ignore */
  protected override readControlValue() {
    const visible = this.visibleInput();
    if (!visible) return;
    let typed = visible.value;
    let caret = visible.selectionStart ?? typed.length;
    const opts = this.opts();
    let raw = parseNumeric(typed, opts);
    const before = formatNumeric(String(this.value ?? ""), opts);
    // Apagar só o separador de milhar não muda nada: apaga também o dígito vizinho.
    if (raw === parseNumeric(before, opts) && before.length === typed.length + 1 && opts.thousand && before[caret] === opts.thousand) {
      const at = this.inputType === "deleteContentForward" ? digitAt(typed, caret, 1) : this.inputType === "deleteContentBackward" ? digitAt(typed, caret - 1, -1) : -1;
      if (at >= 0) {
        typed = typed.slice(0, at) + typed.slice(at + 1);
        if (at < caret) caret = at;
        raw = parseNumeric(typed, opts);
      }
    }
    const display = formatNumeric(raw, opts);
    this.value = raw;
    if (visible.value !== display) {
      visible.value = display;
      const pos = mapCaret(typed, caret, display, this.prefix, this.suffix, this.decimalSeparator);
      visible.setSelectionRange(pos, pos);
    }
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
  private opts(): Opts {
    return {
      prefix: this.prefix,
      suffix: this.suffix,
      thousand: this.thousandSeparator,
      decimal: this.decimalSeparator || ",",
      scale: this.decimalScale,
      allowNegative: this.allowNegative !== "false" && this.allowNegative !== false,
    };
  }

  /** @ignore */
  private visibleInput() {
    return this.renderRoot?.querySelector<HTMLInputElement>("[part=input]") ?? null;
  }

  /** @ignore */
  private submitted() {
    const value = String(this.value ?? "");
    if (!value || value === "-" || value === ".") return "";
    return Number.isNaN(Number(value)) ? "" : value;
  }

  /** @ignore */
  private rangeError() {
    const raw = this.submitted();
    if (!raw) return null;
    const n = Number(raw);
    if (this.min !== "" && n < Number(this.min)) return { flag: "rangeUnderflow", message: `O valor mínimo é ${this.min}.` } as const;
    if (this.max !== "" && n > Number(this.max)) return { flag: "rangeOverflow", message: `O valor máximo é ${this.max}.` } as const;
    return null;
  }

  // O controle escondido guarda a mensagem só para o estado visual de erro; o `<form>` recebe as flags de faixa.
  /** @ignore */
  private customError() {
    return this.rangeError()?.message ?? "";
  }

  /** @ignore */
  private padFraction() {
    if (!this.value || this.value === "-") return;
    if (this.decimalScale < 0 && this.value.endsWith(".")) {
      this.value = this.value.slice(0, -1);
      return;
    }
    if (this.decimalScale <= 0) return;
    const neg = this.value.startsWith("-");
    const body = neg ? this.value.slice(1) : this.value;
    const [intPart, frac = ""] = body.split(".");
    const padded = frac.padEnd(this.decimalScale, "0").slice(0, this.decimalScale);
    this.value = `${neg ? "-" : ""}${intPart || "0"}.${padded}`;
  }

  /** @ignore */
  private onBlur() {
    this.padFraction();
    this.syncControlValue();
    this.handleBlur();
  }

  render() {
    return html`
      <input
        part="input"
        class="phsa-root ds:block ds:w-full ds:min-w-0 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:py-1 ds:shadow-sm ds:transition-colors ds:outline-none ds:placeholder:text-muted-foreground ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
        inputmode="decimal"
        autocomplete="off"
        spellcheck="false"
        placeholder=${ifDefined(this.placeholder || undefined)}
        aria-label=${ifDefined(this.fieldLabel || undefined)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        ?readonly=${this.readOnly}
        @input=${this.onInput}
        @compositionend=${() => this.handleInput()}
        @change=${this.handleChange}
        @blur=${this.onBlur}
      />
      <input
        data-control
        class="ds:sr-only"
        tabindex="-1"
        aria-hidden="true"
        inputmode="decimal"
        ?required=${this.required}
        ?disabled=${this.isDisabled}
        ?readonly=${this.readOnly}
      />
      ${this.renderDescription()}
    `;
  }
}

function parseNumeric(input: string, opts: Opts) {
  let text = input;
  if (opts.prefix && text.startsWith(opts.prefix)) text = text.slice(opts.prefix.length);
  if (opts.suffix && text.endsWith(opts.suffix)) text = text.slice(0, -opts.suffix.length);
  const neg = opts.allowNegative && text.includes("-");
  if (opts.thousand && opts.thousand !== opts.decimal) text = text.split(opts.thousand).join("");
  let intPart = "";
  let frac = "";
  let seen = false;
  for (const char of text) {
    if (char >= "0" && char <= "9") {
      if (seen) frac += char;
      else intPart += char;
    } else if (!seen && opts.scale !== 0 && char === opts.decimal) seen = true;
  }
  if (opts.scale === 0) {
    seen = false;
    frac = "";
  } else if (opts.scale > 0) frac = frac.slice(0, opts.scale);
  if (!intPart && !frac && !seen) return neg ? "-" : "";
  const normalized = intPart.replace(/^0+(?=\d)/, "");
  return `${neg ? "-" : ""}${normalized || "0"}${seen ? `.${frac}` : ""}`;
}

function formatNumeric(raw: string, opts: Opts) {
  if (!raw) return "";
  if (raw === "-") return `${opts.prefix}-${opts.suffix}`;
  const neg = raw.startsWith("-");
  const body = neg ? raw.slice(1) : raw;
  const [intRaw, frac = ""] = body.split(".");
  const intPart = (intRaw || "0").replace(/^0+(?=\d)/, "") || "0";
  const grouped = opts.thousand && opts.thousand !== opts.decimal ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, opts.thousand) : intPart;
  const showDecimal = body.includes(".") && opts.scale !== 0;
  const fraction = opts.scale > 0 ? frac.slice(0, opts.scale) : frac;
  const display = `${neg ? "-" : ""}${grouped}${showDecimal ? opts.decimal + fraction : ""}`;
  return `${opts.prefix}${display}${opts.suffix}`;
}

/** Índice do primeiro dígito a partir de `from`, andando em `step`. */
function digitAt(text: string, from: number, step: 1 | -1) {
  for (let i = from; i >= 0 && i < text.length; i += step) if (text[i] >= "0" && text[i] <= "9") return i;
  return -1;
}

/** Arredonda o valor canônico para `scale` casas, metade para longe do zero, sem passar por float. */
function roundScale(raw: string, scale: number) {
  const match = /^(-?)(\d*)\.(\d*)$/.exec(raw);
  if (!match || match[3].length <= scale) return raw;
  const [, sign, intPart, frac] = match;
  let digits = (intPart || "0") + frac.slice(0, scale);
  if (frac[scale] >= "5") {
    const chars = digits.split("");
    let i = chars.length - 1;
    while (i >= 0 && chars[i] === "9") chars[i--] = "0";
    if (i < 0) chars.unshift("1");
    else chars[i] = String(Number(chars[i]) + 1);
    digits = chars.join("");
  }
  const cut = digits.length - scale;
  const whole = digits.slice(0, cut).replace(/^0+(?=\d)/, "") || "0";
  const result = scale > 0 ? `${whole}.${digits.slice(cut)}` : whole;
  return sign && /[1-9]/.test(result) ? `-${result}` : result;
}

function mapCaret(typed: string, caret: number, display: string, prefix: string, suffix: string, decimal: string) {
  const sig = (char: string) => /[0-9]/.test(char) || char === decimal || char === "-";
  let target = 0;
  for (let i = 0; i < caret && i < typed.length; i++) if (sig(typed[i])) target++;
  const min = prefix.length;
  const max = Math.max(min, display.length - suffix.length);
  if (target === 0) return min;
  let seen = 0;
  for (let i = 0; i < display.length; i++) {
    if (sig(display[i])) seen++;
    if (seen >= target) return Math.min(Math.max(i + 1, min), max);
  }
  return max;
}
