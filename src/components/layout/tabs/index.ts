import { PhsaTab } from "./tab";
import { PhsaTabPanel } from "./tab-panel";
import { PhsaTabs } from "./tabs";

export * from "./tab";
export * from "./tab-panel";
export * from "./tabs";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-tabs")) customElements.define("phsa-tabs", PhsaTabs);
  if (!customElements.get("phsa-tab")) customElements.define("phsa-tab", PhsaTab);
  if (!customElements.get("phsa-tab-panel")) customElements.define("phsa-tab-panel", PhsaTabPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-tabs": PhsaTabs;
    "phsa-tab": PhsaTab;
    "phsa-tab-panel": PhsaTabPanel;
  }
}
