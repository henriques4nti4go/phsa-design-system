import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import { Check, ChevronDown, X } from "lucide";
import { icon } from "../../../core/icon";
import styles from "./select.css?inline";

const sizes = {
  default: "ds:min-h-9 ds:px-3 ds:py-1",
  sm: "ds:min-h-8 ds:px-3 ds:py-1 ds:text-xs",
  lg: "ds:min-h-10 ds:px-4 ds:py-2",
};

export type SelectSize = keyof typeof sizes;
export const SELECT_SIZES = Object.keys(sizes) as SelectSize[];

type Opt = { value: string; label: string; disabled: boolean; group?: string };
type Row = { kind: "group"; label: string } | { kind: "option"; opt: Opt; index: number };

const fold = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const chevron = icon(ChevronDown, "ds:size-4 ds:shrink-0 ds:opacity-50");
const check = icon(Check, "ds:size-4 ds:shrink-0");
const closeIcon = icon(X, "ds:size-3");

/**
 * Lista de opções. Os filhos são `<option>` e `<optgroup>`, como no `<select>` nativo.
 * Com `multiple`, `value` é a lista separada por vírgula e o `<form>` envia um valor por opção.
 *
 * @tag phsa-select
 * @csspart trigger - O botão que abre a lista.
 * @csspart popup - O painel.
 * @csspart listbox - A lista de opções.
 */
export class PhsaSelect extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() size: SelectSize = "default";
  @property() placeholder = "Selecione...";
  @property({ attribute: "search-placeholder" }) searchPlaceholder = "Buscar...";
  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ type: Boolean, reflect: true }) searchable = false;
  @property({ type: Boolean, reflect: true }) readOnly = false;
  /** `0` não limita. */
  @property({ type: Number, attribute: "max-selected" }) maxSelected = 0;
  @property({ type: Number, attribute: "max-visible" }) maxVisible = 5;

  /** @ignore */
  @state() private open = false;
  /** @ignore */
  @state() private search = "";
  /** @ignore */
  @state() private active = 0;

  /** @ignore */
  private listening = false;
  /** @ignore */
  private focusedSearch = false;
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
  protected override formValue() {
    if (!this.multiple) return this.value;
    if (!this.value) return null;
    const data = new FormData();
    const name = this.name ?? "";
    for (const item of this.selectedValues) data.append(name, item);
    return data;
  }

  /** @ignore */
  override formStateRestoreCallback(state: string | FormData | File | null) {
    if (state instanceof FormData) {
      this.value = [...state.values()].map(String).join(",");
      return;
    }
    super.formStateRestoreCallback(state);
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
    this.search = "";
  }

  /** @ignore */
  private markupValue() {
    const selected = [...this.querySelectorAll("option")]
      .filter((option) => option.selected)
      .map((option) => option.value);
    return this.multiple ? selected.join(",") : (selected[0] ?? "");
  }

  /** @ignore */
  private syncFromMarkup() {
    if (this.value !== this.derived) this.fromMarkup = false;
    if (!this.fromMarkup) return;
    this.derived = this.value = this.markupValue();
  }

  protected override update(changed: PropertyValues) {
    if (changed.has("open") && !this.open) this.hidePopup();
    super.update(changed);
  }

  protected override updated() {
    super.updated();
    this.syncLayer();
    if (!this.open) {
      this.focusedSearch = false;
      return;
    }
    this.showPopup();
    this.positionLayer();
    if (this.canSearch && !this.focusedSearch) {
      this.focusedSearch = true;
      this.renderRoot.querySelector<HTMLInputElement>("[part=search]")?.focus();
    }
    const list = this.renderRoot.querySelector<HTMLElement>("[part=listbox]");
    const current = list?.querySelector<HTMLElement>("[data-active]");
    if (list && current) {
      const top = current.offsetTop;
      const bottom = top + current.offsetHeight;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    }
  }

  /** @ignore */
  private get selectedValues() {
    return this.value ? this.value.split(",").filter(Boolean) : [];
  }

  /** @ignore */
  private get canSearch() {
    return this.searchable || this.multiple;
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
    const query = fold(this.search.trim());
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
  private isSelected(value: string) {
    return this.multiple ? this.selectedValues.includes(value) : this.value === value;
  }

  /** @ignore */
  private isLimited(opt: Opt) {
    return (
      this.multiple &&
      this.maxSelected > 0 &&
      !this.isSelected(opt.value) &&
      this.selectedValues.length >= this.maxSelected
    );
  }

  /** @ignore */
  private labelFor(value: string) {
    return this.options().find((opt) => opt.value === value)?.label ?? value;
  }

  /** @ignore */
  private setOpen(next: boolean) {
    if (next && (this.isDisabled || this.readOnly)) return;
    if (next === this.open) return;
    this.open = next;
    if (!next) this.search = "";
    if (next) {
      const options = this.visibleOptions();
      const index = options.findIndex((opt) => !opt.disabled && this.isSelected(opt.value));
      this.active = index >= 0 ? index : this.firstEnabled(options);
    }
  }

  /** @ignore */
  private enabledIndexes(options: Opt[]) {
    return options.flatMap((opt, index) => (opt.disabled || this.isLimited(opt) ? [] : [index]));
  }

  /** @ignore */
  private firstEnabled(options: Opt[]) {
    return this.enabledIndexes(options)[0] ?? 0;
  }

  /** @ignore */
  private choose(value: string) {
    const opt = this.options().find((item) => item.value === value);
    if (!opt || opt.disabled || this.isLimited(opt) || this.isDisabled || this.readOnly) return;
    if (this.multiple) {
      const next = this.isSelected(value)
        ? this.selectedValues.filter((item) => item !== value)
        : [...this.selectedValues, value];
      this.value = next.join(",");
    } else {
      this.value = value;
      this.open = false;
      this.search = "";
      this.renderRoot.querySelector<HTMLElement>("[part=trigger]")?.focus();
    }
    this.commit();
  }

  /** @ignore */
  private removeValue(event: Event, value: string) {
    event.stopPropagation();
    event.preventDefault();
    if (this.isDisabled || this.readOnly) return;
    this.value = this.selectedValues.filter((item) => item !== value).join(",");
    this.commit();
    this.renderRoot.querySelector<HTMLElement>("[part=trigger]")?.focus();
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
  private onTriggerClick(event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest("button")) return;
    this.setOpen(!this.open);
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
    // Botões de remover chip tratam o próprio Enter/Espaço.
    if ((event.target as HTMLElement).closest("button")) return;
    const options = this.visibleOptions();
    if (!this.open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        this.setOpen(true);
      }
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.setOpen(false);
      this.renderRoot.querySelector<HTMLElement>("[part=trigger]")?.focus();
      return;
    }
    if (event.key === "Tab") {
      this.setOpen(false);
      return;
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const enabled = this.enabledIndexes(options);
      if (!enabled.length) return;
      if (event.key === "Home") this.active = enabled[0];
      else if (event.key === "End") this.active = enabled[enabled.length - 1];
      else if (event.key === "ArrowDown") this.active = enabled.find((index) => index > this.active) ?? enabled[0];
      else this.active = [...enabled].reverse().find((index) => index < this.active) ?? enabled[enabled.length - 1];
      return;
    }
    const typing = (event.target as HTMLElement).tagName === "INPUT";
    if ((event.key === "Enter" || (event.key === " " && !typing)) && options[this.active] && !options[this.active].disabled) {
      event.preventDefault();
      this.choose(options[this.active].value);
    }
  }

  /** @ignore */
  private renderChips() {
    const values = this.selectedValues;
    if (!values.length) return html`<span class="ds:truncate ds:text-muted-foreground">${this.placeholder}</span>`;
    const limit = Math.max(this.maxVisible, 1);
    const shown = values.slice(0, limit);
    const removable = !this.isDisabled && !this.readOnly;
    return html`
      ${shown.map(
        (value) => html`
          <span class="ds:inline-flex ds:items-center ds:gap-1 ds:rounded-md ds:bg-secondary ds:px-2 ds:py-0.5 ds:text-xs ds:text-secondary-foreground">
            ${this.labelFor(value)}
            ${removable ? this.renderRemove(value) : nothing}
          </span>
        `,
      )}
      ${values.length > limit ? html`<span class="ds:text-xs ds:text-muted-foreground">+${values.length - limit}</span>` : nothing}
    `;
  }

  /** @ignore */
  private renderRemove(value: string) {
    return html`
      <button
        type="button"
        class="ds:inline-flex ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-inherit ds:opacity-70 ds:hover:opacity-100"
        aria-label=${`Remover ${this.labelFor(value)}`}
        @mousedown=${(event: Event) => event.stopPropagation()}
        @click=${(event: Event) => this.removeValue(event, value)}
      >
        ${closeIcon}
      </button>
    `;
  }

  /** @ignore */
  protected renderControl() {
    const options = this.visibleOptions();
    const active = options.length ? Math.min(this.active, options.length - 1) : 0;
    const single = this.value ? this.labelFor(this.value) : this.placeholder;
    const activeId = this.open && options[active] ? `opt-${active}` : undefined;
    // Com busca, o foco fica no input: ele é o combobox que aponta para a opção ativa.
    const searching = this.open && this.canSearch;
    return html`
      <div class="phsa-root ds:relative ds:block ds:w-full" @keydown=${this.onKeydown} @focusout=${this.onFocusOut}>
        <div
          part="trigger"
          role="combobox"
          tabindex=${this.isDisabled ? -1 : 0}
          class="ds:flex ds:w-full ds:items-center ds:justify-between ds:gap-2 ds:rounded-md ds:border ds:border-input ds:bg-transparent ds:text-left ds:shadow-sm ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:aria-invalid:border-destructive ds:aria-invalid:focus-visible:ring-destructive ${this.isDisabled ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
          aria-disabled=${this.isDisabled ? "true" : "false"}
          aria-expanded=${this.open ? "true" : "false"}
          aria-controls=${ifDefined(this.open ? "listbox" : undefined)}
          aria-haspopup="listbox"
          aria-activedescendant=${ifDefined(searching ? undefined : activeId)}
          aria-label=${ifDefined(this.fieldLabel || undefined)}
          aria-describedby=${ifDefined(this.describedBy)}
          aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
          aria-required=${this.required ? "true" : "false"}
          @click=${this.onTriggerClick}
        >
          <div class="ds:flex ds:min-w-0 ds:flex-1 ds:flex-wrap ds:items-center ds:gap-1">
            ${this.multiple
              ? this.renderChips()
              : html`<span class="ds:truncate ${this.value ? "" : "ds:text-muted-foreground"}">${single}</span>`}
          </div>
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
                ${this.canSearch
                  ? html`
                      <input
                        part="search"
                        class="ds:w-full ds:border-0 ds:border-b ds:border-border ds:bg-transparent ds:px-2 ds:py-2 ds:text-sm ds:outline-none ds:placeholder:text-muted-foreground"
                        type="text"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls="listbox"
                        aria-autocomplete="list"
                        aria-activedescendant=${ifDefined(activeId)}
                        aria-label=${this.fieldLabel ? `${this.fieldLabel}, ${this.searchPlaceholder}` : this.searchPlaceholder}
                        placeholder=${this.searchPlaceholder}
                        .value=${this.search}
                        autocomplete="off"
                        @input=${(event: Event) => {
                          // A busca só filtra: o `input` nativo não pode vazar do host.
                          event.stopPropagation();
                          this.search = (event.target as HTMLInputElement).value;
                          this.active = this.firstEnabled(this.visibleOptions());
                        }}
                      />
                    `
                  : nothing}
                <div
                  part="listbox"
                  id="listbox"
                  role="listbox"
                  aria-multiselectable=${this.multiple ? "true" : "false"}
                  class="ds:max-h-60 ds:overflow-auto ds:p-1"
                >
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
                                aria-selected=${this.isSelected(row.opt.value) ? "true" : "false"}
                                ?data-active=${row.index === active}
                                class="ds:flex ds:w-full ds:items-center ds:gap-2 ds:rounded-sm ds:border-0 ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ${row.index === active ? "ds:bg-accent ds:text-accent-foreground" : "ds:bg-transparent ds:text-foreground"} ${row.opt.disabled || this.isLimited(row.opt) ? "ds:cursor-not-allowed ds:opacity-50" : "ds:cursor-pointer"}"
                                ?disabled=${row.opt.disabled || this.isLimited(row.opt)}
                                @mousemove=${() => {
                                  if (this.active !== row.index) this.active = row.index;
                                }}
                                @mousedown=${(event: Event) => event.preventDefault()}
                                @click=${() => this.choose(row.opt.value)}
                              >
                                <span class="${this.isSelected(row.opt.value) ? "" : "ds:opacity-0"}">${check}</span>
                                <span class="ds:truncate">${row.opt.label}</span>
                              </button>
                            `,
                      )
                    : html`<p class="ds:px-2 ds:py-6 ds:text-center ds:text-sm ds:text-muted-foreground">Nenhum resultado encontrado.</p>`}
                </div>
              </div>
            `
          : nothing}
        <input
          data-control
          class="ds:sr-only"
          tabindex="-1"
          aria-hidden="true"
          ?required=${this.required}
          ?disabled=${this.isDisabled}
          ?readonly=${this.readOnly}
        />
      </div>
    `;
  }
}
