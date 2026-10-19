import { PhsaProgress } from "./progress";

export * from "./progress";

if (typeof customElements !== "undefined" && !customElements.get("phsa-progress")) {
  customElements.define("phsa-progress", PhsaProgress);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-progress": PhsaProgress;
  }
}
