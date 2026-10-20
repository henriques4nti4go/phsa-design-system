import { PhsaIcon } from "./icon";

export * from "./icon";

if (typeof customElements !== "undefined" && !customElements.get("phsa-icon")) {
  customElements.define("phsa-icon", PhsaIcon);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-icon": PhsaIcon;
  }
}
