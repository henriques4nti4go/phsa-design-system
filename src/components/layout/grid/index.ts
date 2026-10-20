import { PhsaGrid } from "./grid";

export * from "./grid";

if (typeof customElements !== "undefined" && !customElements.get("phsa-grid")) {
  customElements.define("phsa-grid", PhsaGrid);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-grid": PhsaGrid;
  }
}
