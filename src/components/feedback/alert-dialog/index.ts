import { PhsaAlertDialog } from "./alert-dialog";

export * from "./alert-dialog";

if (typeof customElements !== "undefined" && !customElements.get("phsa-alert-dialog")) {
  customElements.define("phsa-alert-dialog", PhsaAlertDialog);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-alert-dialog": PhsaAlertDialog;
  }
}
