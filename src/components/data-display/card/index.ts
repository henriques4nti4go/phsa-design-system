import { PhsaCard } from "./card";

export * from "./card";

if (typeof customElements !== "undefined" && !customElements.get("phsa-card")) {
  customElements.define("phsa-card", PhsaCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-card": PhsaCard;
  }
}
