import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./date-picker.css?inline";

const sizes = {
  default: "ds:h-9 ds:px-3",
  sm: "ds:h-8 ds:px-3 ds:text-xs",
  lg: "ds:h-10 ds:px-4",
};

export type DatePickerSize = keyof typeof sizes;
export type DateMode = "single" | "range" | "multiple";
export const DATE_SIZES = Object.keys(sizes) as DatePickerSize[];
export const DATE_MODES = ["single", "range", "multiple"] as const;

const chevron = (path: string) =>
  html`<svg class="ds:size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d=${path} /></svg>`;

const calendarIcon = html`<svg class="ds:size-4 ds:shrink-0 ds:opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>`;

/**
 * Calendário. `mode` é `single` (padrão), `range` ou `multiple`.
 * `value` é `YYYY-MM-DD`, `YYYY-MM-DD/YYYY-MM-DD` no intervalo, ou datas separadas por vírgula.
 * `min`, `max` e `disabled-dates` (`YYYY-MM-DD` separados por vírgula) bloqueiam dias.
 *
 * @tag phsa-date-picker
 * @csspart trigger - O botão que abre o calendário.
 * @csspart popup - O painel.
 * @csspart calendar - A grade de dias.
 */
export class PhsaDatePicker extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: DatePickerSize = "default";
  @property() mode: DateMode = "single";
  @property() placeholder = "";
  @property() min = "";
  @property() max = "";
  @property({ attribute: "disabled-dates" }) disabledDates = "";
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  @state() private open = false;
  /** @ignore */
  @state() private year = new Date().getFullYear();
  /** @ignore */
  @state() private month = new Date().getMonth();
  /** @ignore */
  @state() private cursor = "";
  /** @ignore */
  @state() private hover = "";

  /** @ignore Início do intervalo escolhido, ainda sem fim. Só vira `value` com as duas pontas. */
  @state() private anchor = "";

  /** @ignore */
  private listening = false;

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.clearLayer();
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=trigger]") ?? null;
  }

  /** @ignore */
  override activateFromLabel() {
    if (this.isDisabled || this.readOnly) return;
    super.activateFromLabel();
    this.setOpen(true);
  }

  /** @ignore */
  protected override syncControlValue() {
    super.syncControlValue();
    const input = this.control;
    if (!input) return;
    const message = this.customError();
    if (input.validationMessage !== message) input.setCustomValidity(message);
  }

  /** @ignore */
  override formResetCallback() {
    super.formResetCallback();
    this.setOpen(false);
  }

  protected override update(changed: PropertyValues) {
    if (changed.has("open") && !this.open) this.hidePopup();
    super.update(changed);
  }

  protected override updated() {
    super.updated();
    this.syncLayer();
    if (!this.open) return;
    this.showPopup();
    this.positionLayer();
  }

  /** @ignore */
  private popup() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=popup]") ?? null;
  }

  /** Top layer: escapa de `overflow` e `transform` dos ancestrais. */
  private showPopup() {
    const popup = this.popup();
    if (!popup || popup.matches(":popover-open")) return;
    popup.showPopover();
  }

  /** @ignore */
  private hidePopup() {
    const popup = this.popup();
    if (popup?.matches(":popover-open")) popup.hidePopover();
  }

  /** @ignore */
  private get locale() {
    return this.ownerDocument.documentElement.lang || "pt-BR";
  }

  /** @ignore */
  private rangeParts() {
    const [start = "", end = ""] = this.mode === "range" ? this.value.split("/") : [];
    return { start, end };
  }

  /** @ignore O que o calendário mostra: o intervalo pela metade, se houver. */
  private shownRange() {
    return this.anchor ? { start: this.anchor, end: "" } : this.rangeParts();
  }

  /** @ignore */
  private trigger() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=trigger]") ?? null;
  }

  /** @ignore */
  private dates() {
    return this.value ? this.value.split(",").filter(Boolean) : [];
  }

  /** @ignore */
  private blockedSet() {
    return new Set(
      this.disabledDates
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    );
  }

  /** @ignore */
  private isBlocked(iso: string) {
    if (!iso) return false;
    if (this.min && iso < this.min) return true;
    if (this.max && iso > this.max) return true;
    return this.blockedSet().has(iso);
  }

  /** @ignore */
  private customError() {
    if (this.mode === "range") {
      const { start, end } = this.rangeParts();
      if ((start && this.isBlocked(start)) || (end && this.isBlocked(end))) return "Esta data não está disponível.";
      return "";
    }
    const dates = this.mode === "multiple" ? this.dates() : this.value ? [this.value] : [];
    if (dates.some((iso) => this.isBlocked(iso))) return "Esta data não está disponível.";
    return "";
  }

  /** @ignore */
  private display(iso: string) {
    const date = parseDate(iso);
    if (!date) return "";
    return new Intl.DateTimeFormat(this.locale, { day: "numeric", month: "short", year: "numeric" }).format(date);
  }

  /** @ignore */
  private buttonLabel() {
    if (this.mode === "multiple") {
      const dates = this.dates();
      if (!dates.length) return "";
      if (dates.length <= 2) return dates.map((iso) => this.display(iso)).join(", ");
      return `${dates.length} datas`;
    }
    if (this.mode === "range") {
      const { start, end } = this.rangeParts();
      if (start && end) return `${this.display(start)} – ${this.display(end)}`;
      return start ? this.display(start) : "";
    }
    return this.value ? this.display(this.value) : "";
  }

  /** @ignore */
  private placeholderText() {
    if (this.placeholder) return this.placeholder;
    if (this.mode === "range") return "Selecione um período";
    if (this.mode === "multiple") return "Selecione as datas";
    return "Selecione uma data";
  }

  /** @ignore */
  private setOpen(next: boolean) {
    if (next && (this.isDisabled || this.readOnly)) return;
    if (next === this.open) return;
    if (next) {
      const selected =
        this.mode === "range" ? this.rangeParts().start : this.mode === "multiple" ? this.dates()[0] : this.value;
      const today = toISO(new Date());
      // Abre na data escolhida; sem ela, no primeiro dia permitido a partir de hoje.
      let iso = selected && parseDate(selected) ? selected : today;
      if (iso === today && this.min && parseDate(this.min) && this.min > today) iso = this.min;
      else if (iso === today && this.max && parseDate(this.max) && this.max < today) iso = this.max;
      const date = parseDate(iso)!;
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.cursor = iso;
    } else {
      // Intervalo pela metade é descartado sem ter disparado nada.
      this.anchor = "";
      this.hover = "";
    }
    this.open = next;
  }

  /** @ignore */
  private shift(delta: number) {
    const date = new Date(this.year, this.month + delta, 1);
    this.year = date.getFullYear();
    this.month = date.getMonth();
  }

  /** @ignore */
  private pick(iso: string) {
    if (this.isDisabled || this.readOnly || this.isBlocked(iso)) return;
    if (this.mode === "multiple") {
      const dates = this.dates();
      this.value = (dates.includes(iso) ? dates.filter((item) => item !== iso) : [...dates, iso].sort()).join(",");
    } else if (this.mode === "range") {
      this.cursor = iso;
      if (!this.anchor) {
        this.anchor = iso;
        return;
      }
      const [from, to] = this.anchor <= iso ? [this.anchor, iso] : [iso, this.anchor];
      this.value = `${from}/${to}`;
      this.setOpen(false);
      this.trigger()?.focus();
    } else {
      this.value = iso;
      this.setOpen(false);
      this.trigger()?.focus();
    }
    this.cursor = iso;
    this.commit();
  }

  /** @ignore */
  private commit() {
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.handleChange();
  }

  /** @ignore */
  private readonly onDocPointer = (event: Event) => {
    if (!this.open || event.composedPath().includes(this)) return;
    this.setOpen(false);
  };

  /** @ignore */
  private readonly onReposition = () => this.positionLayer();

  /** @ignore */
  private syncLayer() {
    if (this.open && !this.listening) {
      document.addEventListener("pointerdown", this.onDocPointer, true);
      window.addEventListener("resize", this.onReposition);
      window.addEventListener("scroll", this.onReposition, true);
      this.listening = true;
    } else if (!this.open && this.listening) this.clearLayer();
  }

  /** @ignore */
  private clearLayer() {
    document.removeEventListener("pointerdown", this.onDocPointer, true);
    window.removeEventListener("resize", this.onReposition);
    window.removeEventListener("scroll", this.onReposition, true);
    this.listening = false;
  }

  /** @ignore */
  private positionLayer() {
    const trigger = this.renderRoot.querySelector<HTMLElement>("[part=trigger]");
    const popup = this.renderRoot.querySelector<HTMLElement>("[part=popup]");
    if (!this.open || !trigger || !popup) return;
    const rect = trigger.getBoundingClientRect();
    const height = popup.offsetHeight || 320;
    const width = popup.offsetWidth || 280;
    const flip = rect.bottom + height + 8 > window.innerHeight && rect.top > height + 8;
    const top = flip ? rect.top - height - 4 : rect.bottom + 4;
    const left = Math.min(Math.max(8, rect.left), Math.max(8, window.innerWidth - width - 8));
    popup.style.position = "fixed";
    popup.style.margin = "0";
    popup.style.inset = "auto";
    popup.style.top = `${Math.max(8, top)}px`;
    popup.style.left = `${left}px`;
    popup.style.zIndex = "60";
    popup.style.visibility = "visible";
  }

  /** @ignore */
  // O foco fica sempre no trigger (os botões do painel têm tabindex=-1 e não roubam o foco):
  // setas movem o cursor, PageUp/PageDown trocam o mês, Enter/Espaço escolhem o cursor.
  private onKeydown(event: KeyboardEvent) {
    if (this.isDisabled || this.readOnly) return;
    if (event.target !== this.trigger()) return;
    if (!this.open) {
      if (["ArrowDown", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        this.setOpen(true);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.setOpen(false);
      this.trigger()?.focus();
      return;
    }
    const move: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in move || event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const date = parseDate(this.cursor) ?? new Date();
      if (event.key in move) date.setDate(date.getDate() + move[event.key]);
      else {
        const day = date.getDate();
        date.setDate(1);
        date.setMonth(date.getMonth() + (event.key === "PageDown" ? 1 : -1));
        date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
      }
      this.cursor = toISO(date);
      this.year = date.getFullYear();
      this.month = date.getMonth();
      this.hover = this.cursor;
      return;
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (this.cursor) this.pick(this.cursor);
    }
  }

  // Espaço ativa o botão no keyup: o keydown já tratou, então evita o clique duplicado.
  /** @ignore */
  private onTriggerKeyup(event: KeyboardEvent) {
    if (event.key === " ") event.preventDefault();
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && (event.currentTarget as Node).contains(next)) return;
    if (this.open) this.setOpen(false);
    this.handleBlur();
  }

  /** @ignore */
  private inSpan(iso: string) {
    if (this.mode !== "range") return false;
    const { start, end } = this.shownRange();
    const other = end || (this.hover && this.hover !== start ? this.hover : "");
    if (!start || !other) return false;
    const [from, to] = start < other ? [start, other] : [other, start];
    return iso > from && iso < to;
  }

  /** @ignore */
  private isEndpoint(iso: string) {
    if (this.mode === "multiple") return this.dates().includes(iso);
    if (this.mode === "range") {
      const { start, end } = this.shownRange();
      return iso === start || iso === end;
    }
    return iso === this.value;
  }

  /** @ignore */
  private days() {
    const first = new Date(this.year, this.month, 1);
    const lead = (first.getDay() + 6) % 7;
    const start = new Date(this.year, this.month, 1 - lead);
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }

  render() {
    const label = this.buttonLabel();
    const monthLabel = new Intl.DateTimeFormat(this.locale, { month: "long", year: "numeric" }).format(
      new Date(this.year, this.month, 1),
    );
    const title = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);
    const weekday = new Intl.DateTimeFormat(this.locale, { weekday: "narrow" });
    const today = toISO(new Date());
    return html`
      <div class="phsa-root ds:relative ds:block ds:w-full" @keydown=${this.onKeydown} @focusout=${this.onFocusOut}>
        <button
          part="trigger"
          type="button"
          class="ds:inline-flex ds:w-full ds:items-center ds:gap-2 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:font-normal ds:text-foreground ds:text-left ds:shadow-sm ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
          aria-haspopup="dialog"
          aria-expanded=${this.open ? "true" : "false"}
          aria-label=${ifDefined(this.fieldLabel ? `${this.fieldLabel}, ${label || this.placeholderText()}` : undefined)}
          aria-describedby=${ifDefined(this.describedBy)}
          aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
          ?disabled=${this.isDisabled}
          @keyup=${this.onTriggerKeyup}
          @click=${() => this.setOpen(!this.open)}
        >
          ${calendarIcon}
          <span class="ds:truncate ${label ? "" : "ds:text-muted-foreground"}">${label || this.placeholderText()}</span>
        </button>
        ${this.open
          ? html`
              <div
                part="popup"
                popover="manual"
                class="ds:w-max ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-3 ds:text-foreground ds:shadow-md"
                style="position:fixed;visibility:hidden"
                @mousedown=${(event: Event) => event.preventDefault()}
              >
                <div part="calendar">
                  <div class="ds:mb-2 ds:flex ds:items-center ds:justify-between ds:gap-2">
                    <button
                      type="button"
                      tabindex="-1"
                      class="ds:inline-flex ds:size-8 ds:items-center ds:justify-center ds:rounded-md ds:border-0 ds:bg-transparent ds:text-foreground ds:hover:bg-accent"
                      aria-label="Mês anterior"
                      @mousedown=${(event: Event) => event.preventDefault()}
                      @click=${() => this.shift(-1)}
                    >
                      ${chevron("m15 18-6-6 6-6")}
                    </button>
                    <span class="ds:text-sm ds:font-medium">${title}</span>
                    <button
                      type="button"
                      tabindex="-1"
                      class="ds:inline-flex ds:size-8 ds:items-center ds:justify-center ds:rounded-md ds:border-0 ds:bg-transparent ds:text-foreground ds:hover:bg-accent"
                      aria-label="Próximo mês"
                      @mousedown=${(event: Event) => event.preventDefault()}
                      @click=${() => this.shift(1)}
                    >
                      ${chevron("m9 18 6-6-6-6")}
                    </button>
                  </div>
                  <div class="ds:grid ds:grid-cols-7 ds:gap-1 ds:text-center">
                    ${Array.from({ length: 7 }, (_, index) => {
                      const name = weekday.format(new Date(2024, 0, 1 + index));
                      return html`<span class="ds:text-xs ds:font-medium ds:text-muted-foreground">${name}</span>`;
                    })}
                    ${this.days().map((date) => {
                      const iso = toISO(date);
                      const outside = date.getMonth() !== this.month;
                      const blocked = this.isBlocked(iso);
                      const endpoint = this.isEndpoint(iso);
                      const middle = this.inSpan(iso);
                      const current = iso === this.cursor;
                      return html`
                        <button
                          type="button"
                          tabindex="-1"
                          class="ds:inline-flex ds:size-9 ds:items-center ds:justify-center ds:border-0 ds:p-0 ds:text-sm ${endpoint ? "ds:rounded-md ds:bg-primary ds:text-primary-foreground" : middle ? "ds:bg-accent ds:text-accent-foreground" : `ds:rounded-md ds:bg-transparent ds:hover:bg-accent ${outside ? "ds:text-muted-foreground" : "ds:text-foreground"}`} ${outside ? "ds:opacity-50" : ""} ${blocked ? "ds:cursor-not-allowed ds:opacity-30" : "ds:cursor-pointer"} ${current && !endpoint ? "ds:ring-2 ds:ring-ring" : ""} ${iso === today && !endpoint ? "ds:font-semibold" : ""}"
                          aria-label=${this.display(iso)}
                          aria-pressed=${endpoint ? "true" : "false"}
                          ?disabled=${blocked}
                          @mouseenter=${() => {
                            this.cursor = iso;
                            this.hover = iso;
                          }}
                          @mousedown=${(event: Event) => event.preventDefault()}
                          @click=${() => this.pick(iso)}
                        >
                          ${date.getDate()}
                        </button>
                      `;
                    })}
                  </div>
                </div>
              </div>
            `
          : nothing}
        <input data-control class="ds:sr-only" tabindex="-1" aria-hidden="true" ?required=${this.required} ?disabled=${this.isDisabled} ?readonly=${this.readOnly} />
        ${this.renderDescription()}
      </div>
    `;
  }
}

function parseDate(iso: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  if (date.getFullYear() !== Number(match[1]) || date.getMonth() !== Number(match[2]) - 1) return null;
  return date;
}

function toISO(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}
