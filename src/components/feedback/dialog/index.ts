import { PhsaDialog } from "./dialog";

export * from "./dialog";

if (typeof customElements !== "undefined" && !customElements.get("phsa-dialog")) {
  customElements.define("phsa-dialog", PhsaDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-dialog": PhsaDialog;
  }
}
