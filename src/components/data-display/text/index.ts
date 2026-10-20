import { PhsaText } from "./text";

export * from "./text";

if (typeof customElements !== "undefined" && !customElements.get("phsa-text")) {
  customElements.define("phsa-text", PhsaText);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-text": PhsaText;
  }
}
