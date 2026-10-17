import { PhsaButton } from "./button";

export * from "./button";

if (typeof customElements !== "undefined" && !customElements.get("phsa-button")) {
  customElements.define("phsa-button", PhsaButton);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-button": PhsaButton;
  }
}
