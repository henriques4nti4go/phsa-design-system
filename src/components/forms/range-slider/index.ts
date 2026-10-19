import { PhsaRangeSlider } from "./range-slider";

export * from "./range-slider";

if (typeof customElements !== "undefined" && !customElements.get("phsa-range-slider")) {
  customElements.define("phsa-range-slider", PhsaRangeSlider);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-range-slider": PhsaRangeSlider;
  }
}
