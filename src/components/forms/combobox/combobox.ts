import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./combobox.css?inline";

const sizes = {
  default: "ds:min-h-9 ds:px-3 ds:py-1",
  sm: "ds:min-h-8 ds:px-3 ds:py-1 ds:text-xs",
  lg: "ds:min-h-10 ds:px-4 ds:py-2",
};

export type ComboboxSize = keyof typeof sizes;
export const COMBOBOX_SIZES = Object.keys(sizes) as ComboboxSize[];

type Opt = { value: string; label: string; disabled: boolean; group?: string };
type Row = { kind: "group"; label: string } | { kind: "option"; opt: Opt; index: number };

const fold = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const chevron = html`<svg class="ds:size-4 ds:shrink-0 ds:opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>`;
const check = html`<svg class="ds:size-4 ds:shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>`;
const closeIcon = html`<svg class="ds:size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>`;

/**
 * Campo de texto que filtra uma lista. Os filhos são `<option>` e `<optgroup>`, como no `<select>` nativo.
 * O input mostra o rótulo da opção; o `<form>` recebe o `value` da opção (não o texto digitado),
 * pelos eventos nativos `input` e `change`.
 *
 * @tag phsa-combobox
 * @csspart input - O campo de texto.
 * @csspart popup - O painel.
 * @csspart listbox - A lista de opções.
 */
export class PhsaCombobox extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  /** Altura do campo. */
  @property({ reflect: true }) size: ComboboxSize = "default";
  /** Texto quando não há valor. */
  @property() placeholder = "Buscar...";
  /** Só leitura. Reflete o atributo `readonly`. */
  @property({ type: Boolean, reflect: true }) readOnly = false;

  /** @ignore */
  @state() private open = false;
  /** @ignore */
  @state() private query = "";
  /** @ignore */
  @state() private active = 0;

  /** @ignore Texto livre enquanto a lista está aberta. Fechar sem escolher descarta. */
  private editing = false;
  /** @ignore Evita reabrir a lista ao devolver o foco depois de escolher. */
  private holdOpen = false;
  /** @ignore */
  private listening = false;
  /** @ignore Segundo posicionamento no próximo frame, quando a altura do painel já existe. */
  private justOpened = false;
  /** @ignore O valor ainda vem do `selected` das opções: ninguém mexeu em `value`. */
  private fromMarkup = true;
  /** @ignore O reset volta para o `selected` das opções, não para um `value` inicial. */
  private markupDefault = true;
  /** @ignore Último valor derivado das opções. */
  private derived = "";
  /** @ignore */
  private connectedOnce = false;
  /** @ignore */
  private observer = new MutationObserver((records) => {
    if (records.every((record) => record.type === "attributes" && record.target === this)) return;
    this.syncFromMarkup();
    this.requestUpdate();
  });

  override connectedCallback() {
    if (!this.connectedOnce) {
      this.connectedOnce = true;
      if (this.value || this.hasAttribute("value")) this.fromMarkup = this.markupDefault = false;
    }
    // As opções podem chegar depois do connect (parser, frameworks): o observer refaz isso.
    this.syncFromMarkup();
    super.connectedCallback();
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value", "label", "disabled", "selected"],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
    this.hidePopup();
    this.clearLayer();
  }

  /** @ignore O valor do form mora neste input, não no campo visível. */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.input();
  }

  /** @ignore */
  override activateFromLabel() {
    if (this.isDisabled) return;
    super.activateFromLabel();
  }

  /** @ignore */
  override formResetCallback() {
    super.formResetCallback();
    if (this.markupDefault) {
      this.fromMarkup = true;
      this.derived = this.value = this.markupValue();
      this.syncControlValue();
      this.syncFormState();
    }
    this.setOpen(false);
    this.writeInput(this.selectedLabel());
  }

  /** @ignore */
  private markupValue() {
    return [...this.querySelectorAll("option")].find((option) => option.selected)?.value ?? "";
  }

  /** @ignore */
  private syncFromMarkup() {
    if (this.value !== this.derived) this.fromMarkup = false;
    if (!this.fromMarkup) return;
    this.derived = this.value = this.markupValue();
  }

  protected override update(changed: PropertyValues) {
    if (changed.has("open") && !this.open) this.hidePopup();
    this.justOpened = changed.has("open") && this.open;
    super.update(changed);
  }

  protected override updated() {
    super.updated();
    this.syncLayer();
    if (!this.open) return;
    this.showPopup();
    this.positionLayer();
    if (this.justOpened) {
      requestAnimationFrame(() => {
        if (this.open) this.positionLayer();
      });
    }
    this.scrollActive();
  }

  /** @ignore */
  private input() {
    return this.renderRoot?.querySelector<HTMLInputElement>("[part=input]") ?? null;
  }

  /** @ignore */
  private options(): Opt[] {
    const out: Opt[] = [];
    const walk = (parent: Element, group?: string) => {
      for (const node of [...parent.children]) {
        if (node instanceof HTMLOptGroupElement) walk(node, node.getAttribute("label") || undefined);
        else if (node instanceof HTMLOptionElement) {
          out.push({ value: node.value, label: node.label || node.text, disabled: node.disabled, group });
        }
      }
    };
    walk(this);
    return out;
  }

  /** @ignore */
  private visibleOptions() {
    const query = fold((this.editing ? this.query : "").trim());
    const all = this.options();
    if (!query) return all;
    return all.filter((opt) => fold(opt.label).includes(query) || fold(opt.value).includes(query));
  }

  /** @ignore */
  private rows(): Row[] {
    const rows: Row[] = [];
    let last = "";
    this.visibleOptions().forEach((opt, index) => {
      if (opt.group && opt.group !== last) {
        rows.push({ kind: "group", label: opt.group });
        last = opt.group;
      } else if (!opt.group) last = "";
      rows.push({ kind: "option", opt, index });
    });
    return rows;
  }

  /** @ignore */
  private selectedLabel() {
    if (!this.value) return "";
    return this.options().find((opt) => opt.value === this.value)?.label ?? "";
  }

  /** @ignore */
  private get inputText() {
    return this.editing ? this.query : this.selectedLabel();
  }

  /** @ignore */
  private writeInput(text: string) {
    const input = this.input();
    if (input && input.value !== text) input.value = text;
  }

  /** @ignore */
  private firstEnabled(options: Opt[]) {
    const index = options.findIndex((opt) => !opt.disabled);
    return index < 0 ? 0 : index;
  }

  /** @ignore */
  private setOpen(next: boolean) {
    if (next && (this.isDisabled || this.readOnly)) return;
    if (next === this.open) return;
    if (!next) {
      this.editing = false;
      this.query = "";
      this.writeInput(this.selectedLabel());
    } else {
      const options = this.options();
      const selected = options.findIndex((opt) => !opt.disabled && opt.value === this.value);
      this.active = selected >= 0 ? selected : this.firstEnabled(options);
    }
    this.open = next;
  }

  /** @ignore */
  private choose(value: string) {
    const opt = this.options().find((item) => item.value === value);
    if (!opt || opt.disabled || this.isDisabled || this.readOnly) return;
    this.holdOpen = true;
    this.value = opt.value;
    this.setOpen(false);
    this.commit();
    this.input()?.focus();
    this.holdOpen = false;
  }

  /** @ignore */
  private clear(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.value = "";
    this.editing = false;
    this.query = "";
    this.writeInput("");
    this.commit();
    this.input()?.focus();
  }

  /** @ignore */
  private commit() {
    this.fromMarkup = false;
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
    const height = popup.offsetHeight || 240;
    popup.style.width = `${rect.width}px`;
    const width = popup.offsetWidth || rect.width;
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
  private scrollActive() {
    const list = this.renderRoot.querySelector<HTMLElement>("[part=listbox]");
    const current = list?.querySelector<HTMLElement>("[data-active]");
    if (!list || !current) return;
    const top = current.offsetTop;
    const bottom = top + current.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }

  /** @ignore */
  private onFocus() {
    if (this.holdOpen || this.isDisabled || this.readOnly) return;
    this.input()?.select();
    this.setOpen(true);
  }

  /** @ignore A digitação só filtra. Não lê o rótulo como valor do form. */
  private onType(event: Event) {
    event.stopPropagation();
    if (this.isDisabled || this.readOnly) return;
    this.query = (event.target as HTMLInputElement).value;
    this.editing = true;
    if (!this.open) this.setOpen(true);
    this.active = this.firstEnabled(this.visibleOptions());
  }

  /** @ignore */
  private onPointerDown(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest("input, button")) return;
    event.preventDefault();
    this.input()?.focus();
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    if (next && (event.currentTarget as Node).contains(next)) return;
    if (this.open) this.setOpen(false);
    this.handleBlur();
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    if (this.isDisabled || this.readOnly) return;
    if ((event.target as HTMLElement).closest("button")) return;
    const options = this.visibleOptions();
    if (!this.open) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        this.setOpen(true);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.setOpen(false);
      this.input()?.focus();
      return;
    }
    if (event.key === "Tab") {
      this.setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const enabled = options.flatMap((opt, index) => (opt.disabled ? [] : [index]));
      if (!enabled.length) return;
      if (event.key === "Home") this.active = enabled[0];
      else if (event.key === "End") this.active = enabled[enabled.length - 1];
      else if (event.key === "ArrowDown") this.active = enabled.find((index) => index > this.active) ?? enabled[0];
      else this.active = [...enabled].reverse().find((index) => index < this.active) ?? enabled[enabled.length - 1];
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const opt = options[this.active];
      if (opt && !opt.disabled) this.choose(opt.value);
    }
  }

  render() {
    const options = this.visibleOptions();
    const active = options.length ? Math.min(this.active, options.length - 1) : 0;
    const current = options[active];
    const activeId = this.open && current && !current.disabled ? `opt-${active}` : undefined;
    return html`
      <div class="phsa-root ds:relative ds:block ds:w-full" @keydown=${this.onKeydown} @focusout=${this.onFocusOut}>
        <div
          part="trigger"
          class="ds:flex ds:w-full ds:items-center ds:gap-2 ds:rounded-md ds:border ${this.showInvalid ? "ds:border-destructive" : "ds:border-input"} ds:bg-transparent ds:shadow-sm ds:outline-none ds:focus-within:ring-2 ds:focus-within:ring-ring ds:focus-within:ring-offset-2 ${sizes[this.size] ?? sizes.default} ${this.isDisabled ? "ds:cursor-not-allowed ds:opacity-50" : ""} ${this.hostClass}"
          @pointerdown=${this.onPointerDown}
        >
          <input
            part="input"
            class="ds:min-w-0 ds:flex-1 ds:border-0 ds:bg-transparent ds:p-0 ds:text-sm ds:text-foreground ds:outline-none ds:placeholder:text-muted-foreground"
            type="text"
            role="combobox"
            autocomplete="off"
            placeholder=${this.placeholder}
            .value=${this.inputText}
            ?disabled=${this.isDisabled}
            ?readonly=${this.readOnly}
            aria-expanded=${this.open ? "true" : "false"}
            aria-controls=${ifDefined(this.open ? "listbox" : undefined)}
            aria-autocomplete="list"
            aria-activedescendant=${ifDefined(activeId)}
            aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
            aria-required=${this.required ? "true" : "false"}
            aria-label=${ifDefined(this.fieldLabel || undefined)}
            aria-describedby=${ifDefined(this.describedBy)}
            @focus=${this.onFocus}
            @input=${this.onType}
          />
          ${this.value && !this.isDisabled && !this.readOnly
            ? html`
                <button
                  type="button"
                  class="ds:inline-flex ds:shrink-0 ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-muted-foreground"
                  aria-label="Limpar"
                  @mousedown=${(event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                  @click=${this.clear}
                >
                  ${closeIcon}
                </button>
              `
            : nothing}
          ${chevron}
        </div>
        ${this.open
          ? html`
              <div
                part="popup"
                popover="manual"
                class="ds:overflow-hidden ds:rounded-md ds:border ds:border-border ds:bg-background ds:text-foreground ds:shadow-md"
                style="position:fixed;visibility:hidden"
              >
                <div part="listbox" id="listbox" role="listbox" class="ds:max-h-60 ds:overflow-auto ds:p-1">
                  ${options.length
                    ? this.rows().map((row) =>
                        row.kind === "group"
                          ? html`<div class="ds:px-2 ds:py-1.5 ds:text-xs ds:font-medium ds:text-muted-foreground">${row.label}</div>`
                          : html`
                              <button
                                type="button"
                                id=${`opt-${row.index}`}
                                role="option"
                                tabindex="-1"
                                aria-selected=${this.value === row.opt.value ? "true" : "false"}
                                ?data-active=${row.index === active && !row.opt.disabled}
                                class="ds:flex ds:w-full ds:items-center ds:gap-2 ds:rounded-sm ds:border-0 ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ${row.index === active && !row.opt.disabled ? "ds:bg-accent ds:text-accent-foreground" : "ds:bg-transparent ds:text-foreground"} ${row.opt.disabled ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"}"
                                ?disabled=${row.opt.disabled}
                                @mousemove=${() => {
                                  if (!row.opt.disabled && this.active !== row.index) this.active = row.index;
                                }}
                                @mousedown=${(event: Event) => event.preventDefault()}
                                @click=${() => this.choose(row.opt.value)}
                              >
                                <span class="${this.value === row.opt.value ? "" : "ds:opacity-0"}">${check}</span>
                                <span class="ds:truncate">${row.opt.label}</span>
                              </button>
                            `,
                      )
                    : html`<p class="ds:px-2 ds:py-6 ds:text-center ds:text-sm ds:text-muted-foreground">Nenhum resultado encontrado.</p>`}
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
