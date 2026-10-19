import { PhsaContextMenu } from "./context-menu";

export * from "./context-menu";
export * from "../dropdown-menu/dropdown-item";
export * from "../dropdown-menu/dropdown-separator";

if (typeof customElements !== "undefined" && !customElements.get("phsa-context-menu")) {
  customElements.define("phsa-context-menu", PhsaContextMenu);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-context-menu": PhsaContextMenu;
  }
}
