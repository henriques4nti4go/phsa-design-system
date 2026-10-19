import { html, unsafeCSS, type PropertyValues } from "lit";
import { PhsaAnchored } from "../../../core/anchored";
import "../dropdown-menu";
import type { PhsaDropdownItem } from "../dropdown-menu/dropdown-item";
import styles from "./context-menu.css?inline";

/**
 * Menu aberto pelo clique secundário sobre o slot `trigger`.
 *
 * @tag phsa-context-menu
 * @slot trigger - A região que abre o menu.
 * @slot - `phsa-dropdown-item` e `phsa-dropdown-separator`.
 * @csspart popup - O menu.
 * @fires phsa-toggle - Quando abre ou fecha.
 * @fires phsa-select - Quando um item é ativado.
 */
export class PhsaContextMenu extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  /** @ignore */
  private point = new DOMRect();
  /** @ignore */
  private typed = "";
  /** @ignore */
  private typedTimer = 0;

  constructor() {
    super();
    this.side = "bottom";
    this.align = "start";
    this.addEventListener("phsa-select", (event: Event) => {
      const item = event.target as Element;
      if (item.localName !== "phsa-dropdown-item" || item.closest("phsa-context-menu") !== this) return;
      this.hide();
    });
    this.addEventListener("focusout", (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (this.open && next && !this.contains(next) && !this.renderRoot.contains(next)) this.hide();
    });
  }

  /** Abre o menu nas coordenadas da viewport. */
  showAt(x: number, y: number) {
    this.point = new DOMRect(x, y, 1, 1);
    this.show();
    this.requestUpdate();
    void this.updateComplete.then(() => this.reposition());
  }

  protected override anchorBounds() {
    return this.point;
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has("open") && this.open) this.enabled()[0]?.focus();
  }

  /** @ignore */
  private items() {
    return [...this.querySelectorAll<PhsaDropdownItem>("phsa-dropdown-item")].filter(
      (item) => item.closest("phsa-context-menu") === this,
    );
  }

  /** @ignore */
  private enabled() {
    return this.items().filter((item) => !item.disabled);
  }

  /** @ignore */
  private onContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.showAt(event.clientX, event.clientY);
  }

  /** @ignore */
  private syncTrigger() {
    this.triggerControl()?.setAttribute("aria-haspopup", "menu");
  }

  /** @ignore */
  private onTriggerKey(event: KeyboardEvent) {
    if (event.key !== "ContextMenu" && !(event.shiftKey && event.key === "F10")) return;
    event.preventDefault();
    const rect = this.triggerControl()?.getBoundingClientRect();
    if (rect) this.showAt(rect.left, rect.bottom);
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
    if (event.key === "ArrowDown") go(index + 1);
    else if (event.key === "ArrowUp") go(index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(items.length - 1);
    else if (event.key.length === 1 && event.key !== " " && !event.altKey && !event.ctrlKey && !event.metaKey) {
      window.clearTimeout(this.typedTimer);
      this.typed += event.key.toLocaleLowerCase();
      this.typedTimer = window.setTimeout(() => (this.typed = ""), 500);
      const start = this.typed.length === 1 ? index + 1 : index;
      for (let step = 0; step < items.length; step++) {
        const at = (start + step) % items.length;
        if ((items[at].textContent?.trim().toLocaleLowerCase() ?? "").startsWith(this.typed)) {
          go(at);
          break;
        }
      }
    }
  }

  render() {
    return html`
      <div class="phsa-root ds:contents">
        <slot
          name="trigger"
          @contextmenu=${this.onContextMenu}
          @keydown=${this.onTriggerKey}
          @slotchange=${this.syncTrigger}
        ></slot>
        <div
          part="popup"
          popover="manual"
          role="menu"
          class="ds:flex ds:min-w-32 ds:flex-col ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-1 ds:text-foreground ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
          @keydown=${this.onMenuKey}
        ><slot></slot></div>
      </div>
    `;
  }
}
