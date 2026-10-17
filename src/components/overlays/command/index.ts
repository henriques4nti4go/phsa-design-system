import { PhsaCommand } from "./command";
import { PhsaCommandGroup } from "./command-group";
import { PhsaCommandItem } from "./command-item";
import { PhsaCommandSeparator } from "./command-separator";

export * from "./command";
export * from "./command-group";
export * from "./command-item";
export * from "./command-separator";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-command")) customElements.define("phsa-command", PhsaCommand);
  if (!customElements.get("phsa-command-group")) customElements.define("phsa-command-group", PhsaCommandGroup);
  if (!customElements.get("phsa-command-item")) customElements.define("phsa-command-item", PhsaCommandItem);
  if (!customElements.get("phsa-command-separator")) customElements.define("phsa-command-separator", PhsaCommandSeparator);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-command": PhsaCommand;
    "phsa-command-group": PhsaCommandGroup;
    "phsa-command-item": PhsaCommandItem;
    "phsa-command-separator": PhsaCommandSeparator;
  }
}
