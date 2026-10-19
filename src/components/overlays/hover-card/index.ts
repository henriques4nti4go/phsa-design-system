import { PhsaHoverCard } from "./hover-card";

export * from "./hover-card";

if (typeof customElements !== "undefined" && !customElements.get("phsa-hover-card")) {
  customElements.define("phsa-hover-card", PhsaHoverCard);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-hover-card": PhsaHoverCard;
  }
}
