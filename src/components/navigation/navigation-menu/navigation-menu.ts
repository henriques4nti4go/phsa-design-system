import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaNavigationMenuItem } from "./navigation-menu-item";
import styles from "./navigation-menu.css?inline";

/**
 * Navegação horizontal com links e painéis. Passar o mouse ou clicar abre um painel; só um fica aberto.
 *
 * @tag phsa-navigation-menu
 * @slot - Itens `phsa-navigation-menu-item`.
 * @csspart list - A faixa de itens.
 */
export class PhsaNavigationMenu extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() label = "Navegação principal";

  constructor() {
    super();
    this.addEventListener("phsa-toggle", (event: Event) => {
      const item = event.target as PhsaNavigationMenuItem;
      if (item.localName !== "phsa-navigation-menu-item" || item.closest("phsa-navigation-menu") !== this) return;
      if (item.open) this.items().forEach((other) => other !== item && other.hide());
    });
    this.addEventListener("focusout", (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && this.contains(next)) return;
      this.closeAll();
    });
  }

  /** Algum painel está aberto. @ignore */
  isArmed() {
    return this.items().some((item) => item.open);
  }

  /** Fecha todos os painéis. @ignore */
  closeAll() {
    this.items().forEach((item) => item.hide());
  }

  /** Foca o item vizinho; se um painel está aberto, abre o do vizinho. @ignore */
  focusRelative(from: PhsaNavigationMenuItem, dir: 1 | -1) {
    const items = this.items().filter((item) => !item.disabled);
    const index = items.indexOf(from);
    if (index < 0 || !items.length) return;
    const next = items[(index + dir + items.length) % items.length];
    if (this.isArmed() && !next.href) {
      next.autoFocus = true;
      next.show();
    } else {
      if (this.isArmed()) this.closeAll();
      next.focus();
    }
  }

  /** @ignore */
  items() {
    return [...this.querySelectorAll<PhsaNavigationMenuItem>("phsa-navigation-menu-item")].filter(
      (item) => item.closest("phsa-navigation-menu") === this,
    );
  }

  render() {
    return html`
      <nav part="list" aria-label=${this.label} class="phsa-root ds:inline-flex ds:items-center ds:gap-1 ds:rounded-md ds:bg-background ds:p-1 ${this.hostClass}">
        <slot></slot>
      </nav>
    `;
  }
}
