import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaMenubarMenu } from "./menubar-menu";
import styles from "./menubar.css?inline";

/**
 * Barra de menus. Clique abre um menu; com um aberto, passar o mouse ou as setas troca para o vizinho.
 *
 * @tag phsa-menubar
 * @slot - Itens `phsa-menubar-menu`.
 * @csspart bar - A faixa de menus.
 */
export class PhsaMenubar extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() label = "Barra de menus";

  constructor() {
    super();
    this.addEventListener("phsa-toggle", (event: Event) => {
      const menu = event.target as PhsaMenubarMenu;
      if (menu.localName !== "phsa-menubar-menu" || menu.closest("phsa-menubar") !== this) return;
      if (menu.open) this.menus().forEach((other) => other !== menu && other.hide());
      this.syncTab(menu.open ? menu : undefined);
    });
    this.addEventListener("focusout", (event: FocusEvent) => {
      const next = event.relatedTarget as Node | null;
      if (next && this.contains(next)) return;
      this.menus().forEach((menu) => menu.hide());
    });
  }

  /** Algum menu está aberto. @ignore */
  isArmed() {
    return this.menus().some((menu) => menu.open);
  }

  /** Foca o menu vizinho; se a barra está armada, abre o painel dele. @ignore */
  focusRelative(from: PhsaMenubarMenu, dir: 1 | -1) {
    const menus = this.menus().filter((menu) => !menu.disabled);
    const index = menus.indexOf(from);
    if (index < 0 || !menus.length) return;
    const next = menus[(index + dir + menus.length) % menus.length];
    if (this.isArmed()) {
      next.autoFocus = true;
      next.landing = "first";
      next.show();
    } else {
      next.focus();
      this.syncTab(next);
    }
  }

  /** @ignore */
  menus() {
    return [...this.querySelectorAll<PhsaMenubarMenu>("phsa-menubar-menu")].filter(
      (menu) => menu.closest("phsa-menubar") === this,
    );
  }

  /** @ignore */
  private syncTab(active?: PhsaMenubarMenu) {
    const menus = this.menus().filter((menu) => !menu.disabled);
    const current = active && menus.includes(active) ? active : (menus.find((menu) => menu.tabbable) ?? menus[0]);
    for (const menu of this.menus()) menu.tabbable = menu === current;
  }

  protected override firstUpdated(changed: PropertyValues) {
    super.firstUpdated(changed);
    this.syncTab();
  }

  /** @ignore */
  private onSlotChange() {
    this.syncTab();
  }

  render() {
    return html`
      <div
        part="bar"
        role="menubar"
        aria-label=${this.label}
        class="phsa-root ds:inline-flex ds:h-10 ds:items-center ds:gap-1 ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-1 ${this.hostClass}"
      >
        <slot @slotchange=${this.onSlotChange}></slot>
      </div>
    `;
  }
}
