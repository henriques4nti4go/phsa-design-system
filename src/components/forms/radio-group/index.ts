import "../radio";
import { PhsaRadioGroup } from "./radio-group";

export * from "./radio-group";

if (typeof customElements !== "undefined" && !customElements.get("phsa-radio-group")) {
  customElements.define("phsa-radio-group", PhsaRadioGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-radio-group": PhsaRadioGroup;
  }
}
