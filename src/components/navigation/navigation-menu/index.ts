import { PhsaNavigationMenuItem } from "./navigation-menu-item";
import { PhsaNavigationMenu } from "./navigation-menu";

export * from "./navigation-menu-item";
export * from "./navigation-menu";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-navigation-menu")) customElements.define("phsa-navigation-menu", PhsaNavigationMenu);
  if (!customElements.get("phsa-navigation-menu-item")) customElements.define("phsa-navigation-menu-item", PhsaNavigationMenuItem);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-navigation-menu": PhsaNavigationMenu;
    "phsa-navigation-menu-item": PhsaNavigationMenuItem;
  }
}
