import { PhsaMenubarMenu } from "./menubar-menu";
import { PhsaMenubar } from "./menubar";

export * from "./menubar-menu";
export * from "./menubar";
export * from "../../overlays/dropdown-menu/dropdown-item";
export * from "../../overlays/dropdown-menu/dropdown-separator";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-menubar")) customElements.define("phsa-menubar", PhsaMenubar);
  if (!customElements.get("phsa-menubar-menu")) customElements.define("phsa-menubar-menu", PhsaMenubarMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-menubar": PhsaMenubar;
    "phsa-menubar-menu": PhsaMenubarMenu;
  }
}
