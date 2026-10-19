import { PhsaBreadcrumbItem } from "./breadcrumb-item";
import { PhsaBreadcrumb } from "./breadcrumb";

export * from "./breadcrumb-item";
export * from "./breadcrumb";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-breadcrumb")) customElements.define("phsa-breadcrumb", PhsaBreadcrumb);
  if (!customElements.get("phsa-breadcrumb-item")) customElements.define("phsa-breadcrumb-item", PhsaBreadcrumbItem);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-breadcrumb": PhsaBreadcrumb;
    "phsa-breadcrumb-item": PhsaBreadcrumbItem;
  }
}
