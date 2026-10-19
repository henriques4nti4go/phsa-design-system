import { PhsaRating } from "./rating";

export * from "./rating";

if (typeof customElements !== "undefined" && !customElements.get("phsa-rating")) {
  customElements.define("phsa-rating", PhsaRating);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-rating": PhsaRating;
  }
}
