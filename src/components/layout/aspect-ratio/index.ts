import { PhsaAspectRatio } from "./aspect-ratio";

export * from "./aspect-ratio";

if (typeof customElements !== "undefined" && !customElements.get("phsa-aspect-ratio")) {
  customElements.define("phsa-aspect-ratio", PhsaAspectRatio);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-aspect-ratio": PhsaAspectRatio;
  }
}
