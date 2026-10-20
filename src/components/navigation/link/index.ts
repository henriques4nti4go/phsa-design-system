import { PhsaLink } from "./link";

export * from "./link";

if (typeof customElements !== "undefined" && !customElements.get("phsa-link")) {
  customElements.define("phsa-link", PhsaLink);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-link": PhsaLink;
  }
}
