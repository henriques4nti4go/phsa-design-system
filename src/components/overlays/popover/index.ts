import { PhsaPopover } from "./popover";

export * from "./popover";

if (typeof customElements !== "undefined" && !customElements.get("phsa-popover")) {
  customElements.define("phsa-popover", PhsaPopover);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-popover": PhsaPopover;
  }
}
