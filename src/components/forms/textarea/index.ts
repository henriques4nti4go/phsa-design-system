import { PhsaTextarea } from "./textarea";

export * from "./textarea";

if (typeof customElements !== "undefined" && !customElements.get("phsa-textarea")) {
  customElements.define("phsa-textarea", PhsaTextarea);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-textarea": PhsaTextarea;
  }
}
