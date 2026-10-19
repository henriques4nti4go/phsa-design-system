import { PhsaSheet } from "./sheet";

export * from "./sheet";

if (typeof customElements !== "undefined" && !customElements.get("phsa-sheet")) {
  customElements.define("phsa-sheet", PhsaSheet);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-sheet": PhsaSheet;
  }
}
