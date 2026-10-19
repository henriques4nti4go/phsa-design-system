import { PhsaToggleGroup } from "./toggle-group";
import { PhsaToggle } from "./toggle";

export * from "./toggle-group";
export * from "./toggle";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-toggle")) customElements.define("phsa-toggle", PhsaToggle);
  if (!customElements.get("phsa-toggle-group")) customElements.define("phsa-toggle-group", PhsaToggleGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-toggle": PhsaToggle;
    "phsa-toggle-group": PhsaToggleGroup;
  }
}
