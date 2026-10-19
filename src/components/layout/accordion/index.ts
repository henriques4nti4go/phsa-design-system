import { PhsaAccordionItem } from "./accordion-item";
import { PhsaAccordion } from "./accordion";

export * from "./accordion-item";
export * from "./accordion";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-accordion")) customElements.define("phsa-accordion", PhsaAccordion);
  if (!customElements.get("phsa-accordion-item")) customElements.define("phsa-accordion-item", PhsaAccordionItem);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-accordion": PhsaAccordion;
    "phsa-accordion-item": PhsaAccordionItem;
  }
}
