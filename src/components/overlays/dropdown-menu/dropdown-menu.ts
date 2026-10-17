import { html, unsafeCSS, type PropertyValues } from "lit";
import { PhsaAnchored } from "../../../core/anchored";
import type { PhsaDropdownItem } from "./dropdown-item";
import styles from "./dropdown-menu.css?inline";

/**
 * Menu de ações ancorado no slot `trigger`. Fecha ao escolher um item, no clique fora, no Escape
 * e quando o foco sai. Setas, Home/End e a primeira letra movem o foco entre os itens.
 *
 * @tag phsa-dropdown-menu
 * @slot trigger - O botão que abre.
 * @slot - `phsa-dropdown-item` e `phsa-dropdown-separator`.
 * @csspart popup - O menu.
 * @fires phsa-toggle - Quando abre ou fecha. `detail.open` diz o estado.
 * @fires phsa-select - Quando um item é ativado. `detail.value` vem do item.
 */
export class PhsaDropdownMenu extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  /** @ignore */
  private landing: "first" | "last" = "first";
  /** @ignore */
  private typed = "";
  /** @ignore */
  private typedTimer = 0;

  constructor() {
    super();
    this.addEventListener("phsa-select", (event: Event) => {
      const item = event.target as Element;
      // Só itens deste menu: um command ou menu aninhado não fecha este.
      if (item.localName !== "phsa-dropdown-item" || item.closest("phsa-dropdown-menu") !== this) return;
      this.hide();
      this.focusTrigger();
    });
    this.addEventListener("focusout", (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (this.open && next && !this.contains(next) && !this.renderRoot.contains(next)) this.hide();
    });
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    this.syncTrigger();
    if (changed.has("open") && this.open) {
      const items = this.enabled();
      (this.landing === "last" ? items.at(-1) : items[0])?.focus();
      this.landing = "first";
    }
  }

  /** @ignore */
  private items() {
    return [...this.querySelectorAll<PhsaDropdownItem>("phsa-dropdown-item")].filter((item) => item.closest("phsa-dropdown-menu") === this);
  }

  /** @ignore */
  private enabled() {
    return this.items().filter((item) => !item.disabled);
  }

  /** @ignore */
  private syncTrigger() {
    const control = this.triggerControl();
    if (!control) return;
    control.setAttribute("aria-haspopup", "menu");
    control.setAttribute("aria-expanded", String(this.open));
  }

  /** @ignore */
  private onTriggerKey(event: KeyboardEvent) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    this.landing = event.key === "ArrowUp" ? "last" : "first";
    if (!this.open) {
      this.show();
      return;
    }
    const items = this.enabled();
    (this.landing === "last" ? items.at(-1) : items[0])?.focus();
    this.landing = "first";
  }

  /** @ignore */
  private onMenuKey(event: KeyboardEvent) {
    const items = this.enabled();
    if (!items.length) return;
    const found = items.findIndex((item) => event.composedPath().includes(item));
    const index = found < 0 ? 0 : found;
    const go = (to: number) => {
      event.preventDefault();
      items[(to + items.length) % items.length]?.focus();
    };
    if (event.key === "ArrowDown") go(found < 0 ? 0 : index + 1);
    else if (event.key === "ArrowUp") go(found < 0 ? items.length - 1 : index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(items.length - 1);
    else if (event.key.length === 1 && event.key !== " " && !event.altKey && !event.ctrlKey && !event.metaKey) {
      // Busca pela digitação: letras seguidas em até 500ms somam ao prefixo.
      window.clearTimeout(this.typedTimer);
      this.typed += event.key.toLowerCase();
      this.typedTimer = window.setTimeout(() => (this.typed = ""), 500);
      const label = (item: PhsaDropdownItem) => item.textContent?.trim().toLowerCase() ?? "";
      const start = found < 0 ? 0 : this.typed.length === 1 ? index + 1 : index;
      for (let step = 0; step < items.length; step++) {
        const at = (start + step) % items.length;
        if (label(items[at]).startsWith(this.typed)) {
          go(at);
          break;
        }
      }
    }
  }

  render() {
    return html`
      <div class="phsa-root ds:inline-block">
        <slot name="trigger" @click=${this.onTriggerClick} @keydown=${this.onTriggerKey} @slotchange=${this.syncTrigger}></slot>
        <div
          part="popup"
          popover="manual"
          role="menu"
          class="ds:flex ds:min-w-32 ds:flex-col ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-1 ds:text-foreground ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
          @keydown=${this.onMenuKey}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
