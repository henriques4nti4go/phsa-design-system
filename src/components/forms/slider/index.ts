import { PhsaSlider } from "./slider";

export * from "./slider";

if (typeof customElements !== "undefined" && !customElements.get("phsa-slider")) {
  customElements.define("phsa-slider", PhsaSlider);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-slider": PhsaSlider;
  }
}
