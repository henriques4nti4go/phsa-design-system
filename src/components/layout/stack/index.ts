import { PhsaStack } from "./stack";

export * from "./stack";

if (typeof customElements !== "undefined" && !customElements.get("phsa-stack")) {
  customElements.define("phsa-stack", PhsaStack);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-stack": PhsaStack;
  }
}
