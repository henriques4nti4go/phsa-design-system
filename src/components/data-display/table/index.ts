import { PhsaCell } from "./cell";
import { PhsaColumn } from "./column";
import { PhsaRow } from "./row";
import { PhsaTable } from "./table";

export * from "./cell";
export * from "./column";
export * from "./row";
export * from "./table";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-table")) customElements.define("phsa-table", PhsaTable);
  if (!customElements.get("phsa-column")) customElements.define("phsa-column", PhsaColumn);
  if (!customElements.get("phsa-row")) customElements.define("phsa-row", PhsaRow);
  if (!customElements.get("phsa-cell")) customElements.define("phsa-cell", PhsaCell);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-table": PhsaTable;
    "phsa-column": PhsaColumn;
    "phsa-row": PhsaRow;
    "phsa-cell": PhsaCell;
  }
}
