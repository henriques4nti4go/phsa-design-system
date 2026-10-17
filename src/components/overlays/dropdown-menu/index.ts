import { PhsaDropdownItem } from "./dropdown-item";
import { PhsaDropdownMenu } from "./dropdown-menu";
import { PhsaDropdownSeparator } from "./dropdown-separator";

export * from "./dropdown-item";
export * from "./dropdown-menu";
export * from "./dropdown-separator";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-dropdown-menu")) customElements.define("phsa-dropdown-menu", PhsaDropdownMenu);
  if (!customElements.get("phsa-dropdown-item")) customElements.define("phsa-dropdown-item", PhsaDropdownItem);
  if (!customElements.get("phsa-dropdown-separator")) customElements.define("phsa-dropdown-separator", PhsaDropdownSeparator);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-dropdown-menu": PhsaDropdownMenu;
    "phsa-dropdown-item": PhsaDropdownItem;
    "phsa-dropdown-separator": PhsaDropdownSeparator;
  }
}
