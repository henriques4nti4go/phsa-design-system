import { html, nothing, svg, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import "../skeleton";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaCell } from "./cell";
import type { PhsaColumn } from "./column";
import type { PhsaRow } from "./row";
import styles from "./table.css?inline";

export type SortDirection = "asc" | "desc" | "";
export const SORT_DIRECTIONS: SortDirection[] = ["", "asc", "desc"];

const aligns = {
  left: "ds:text-left",
  center: "ds:text-center",
  right: "ds:text-right",
};

/**
 * Tabela. Colunas e linhas ficam na luz; cada célula entra num `<td>` pelo slot `c-linha-coluna`.
 *
 * Limitação: o slot só recebe filhos diretos, então as `phsa-cell` saem da `phsa-row` e viram filhas
 * da tabela. Remover ou mover a linha inteira funciona: as células voltam para ela. Remover uma célula
 * direto da linha (`row.removeChild(cell)`, como faz um framework) falha, porque ela não está mais lá;
 * use `cell.remove()` ou recrie a linha.
 *
 * @tag phsa-table
 * @slot empty - Estado vazio customizado.
 * @csspart table - O `<table>` nativo.
 * @csspart selection - Os controles de seleção.
 * @fires phsa-sort - Ao pedir ordenação. `detail.key` e `detail.direction` descrevem o novo estado.
 * @fires phsa-selection-change - Ao mudar a seleção. `detail.values` contém os valores selecionados.
 */
export class PhsaTable extends PhsaElement {
  static styles = unsafeCSS(styles);

  /** Legenda. Renderizada como `<caption>` quando não está vazia. */
  @property({ reflect: true }) caption = "";

  @property({ attribute: "sort-key" }) sortKey = "";
  @property({ attribute: "sort-direction" }) sortDirection: SortDirection = "";
  @property({ type: Boolean, reflect: true }) selectable = false;
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true, attribute: "sticky-header" }) stickyHeader = false;

  /** @ignore */
  private columns: PhsaColumn[] = [];

  /** @ignore */
  private rows: PhsaRow[] = [];

  /** @ignore */
  private entries: PhsaCell[][] = [];

  /** @ignore */
  private readonly cellsOf = new WeakMap<PhsaRow, PhsaCell[]>();

  /** @ignore */
  private readonly rowOf = new WeakMap<PhsaCell, PhsaRow>();

  /** @ignore */
  private readonly observer = new MutationObserver(() => {
    this.requestUpdate();
  });

  override connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["key", "label", "sortable", "align", "width", "value", "selected", "disabled"],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    this.syncFromLightDom();
    if (!this.columns.some((column, index) => column.sortable && this.columnKey(column, index) === this.sortKey)) {
      this.sortKey = "";
      this.sortDirection = "";
    }
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const checkbox = this.renderRoot.querySelector<HTMLInputElement>("[data-select-all]");
    if (!checkbox) return;
    const enabled = this.rows.filter((row) => !row.disabled);
    checkbox.indeterminate = enabled.some((row) => row.selected) && !enabled.every((row) => row.selected);
  }

  /**
   * Lê colunas, linhas e células e define `slot` em cada célula existente.
   * O slot do shadow só recebe filho direto do host.
   *
   * @ignore
   */
  private syncFromLightDom() {
    const columns = [...this.querySelectorAll<PhsaColumn>("phsa-column")].filter((column) => column.closest("phsa-table") === this);
    const rows = [...this.querySelectorAll(":scope > phsa-row")] as PhsaRow[];
    this.rows = rows;
    const used = new Set<PhsaCell>();
    let moved = false;
    const move = (cell: PhsaCell, parent: Element) => {
      moved = true;
      parent.appendChild(cell);
    };

    this.entries = rows.map((row, rowIndex) => {
      const inRow = [...row.querySelectorAll(":scope > phsa-cell")] as PhsaCell[];
      const lifted = (this.cellsOf.get(row) ?? []).filter((cell) => cell.isConnected && cell.parentElement === this);
      const all = [...lifted, ...inRow.filter((cell) => !lifted.includes(cell))];
      const cells = all.slice(0, columns.length);

      cells.forEach((cell, colIndex) => {
        used.add(cell);
        this.rowOf.set(cell, row);
        const name = `c-${rowIndex}-${colIndex}`;
        if (cell.slot !== name) cell.slot = name;
        if (cell.parentElement !== this) move(cell, this);
      });

      this.cellsOf.set(row, cells);
      return cells;
    });

    this.columns = columns;

    // Células que sobraram (linha removida ou coluna a menos) voltam para a linha de origem.
    for (const cell of [...this.querySelectorAll<PhsaCell>(":scope > phsa-cell")]) {
      if (used.has(cell)) continue;
      if (cell.slot) cell.slot = "";
      const row = this.rowOf.get(cell);
      if (!row) continue;
      this.rowOf.delete(cell);
      move(cell, row);
    }
    // Descarta as mutações feitas aqui mesmo.
    if (moved) this.observer.takeRecords();
  }

  /** @ignore */
  private rowOrder() {
    const indices = this.entries.map((_, index) => index);
    const columnIndex = this.columns.findIndex(
      (column, index) => column.sortable && this.columnKey(column, index) === this.sortKey,
    );
    if (columnIndex < 0 || !this.sortDirection) return indices;
    return [...indices].sort((a, b) => {
      const left = this.entries[a][columnIndex]?.textContent ?? "";
      const right = this.entries[b][columnIndex]?.textContent ?? "";
      const compared = left.localeCompare(right, "pt", { numeric: true, sensitivity: "base" });
      return this.sortDirection === "asc" ? compared : -compared;
    });
  }

  /** @ignore */
  private columnKey(column: PhsaColumn, index: number) {
    return column.key || String(index);
  }

  /** @ignore */
  private toggleSort(column: PhsaColumn, index: number) {
    const key = this.columnKey(column, index);
    const direction: SortDirection =
      this.sortKey !== key ? "asc" : this.sortDirection === "asc" ? "desc" : this.sortDirection === "desc" ? "" : "asc";
    this.sortKey = direction ? key : "";
    this.sortDirection = direction;
    this.dispatchEvent(new CustomEvent("phsa-sort", { bubbles: true, composed: true, detail: { key, direction } }));
  }

  /** @ignore */
  private columnSort(column: PhsaColumn, index: number): "ascending" | "descending" | "none" {
    if (this.sortKey !== this.columnKey(column, index) || !this.sortDirection) return "none";
    return this.sortDirection === "asc" ? "ascending" : "descending";
  }

  /** @ignore */
  private chevron(column: PhsaColumn, index: number) {
    const direction = this.sortKey === this.columnKey(column, index) ? this.sortDirection : "";
    if (direction === "asc") {
      return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M3 7.5 6 4.5 9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    }
    if (direction === "desc") {
      return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    }
    return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M2.5 4.25 6 1.75 9.5 4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.5 7.75 6 10.25 9.5 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
  }

  /** @ignore */
  private rowValue(row: PhsaRow, index: number) {
    return row.value || String(index);
  }

  /** @ignore */
  private emitSelection() {
    const values = this.rows
      .map((row, index) => ({ row, value: this.rowValue(row, index) }))
      .filter(({ row }) => row.selected)
      .map(({ value }) => value);
    this.dispatchEvent(new CustomEvent("phsa-selection-change", { bubbles: true, composed: true, detail: { values } }));
  }

  /** @ignore */
  private toggleRow(row: PhsaRow) {
    if (row.disabled) return;
    row.selected = !row.selected;
    this.requestUpdate();
    this.emitSelection();
  }

  /** @ignore */
  private toggleAll(checked: boolean) {
    for (const row of this.rows) {
      if (!row.disabled) row.selected = checked;
    }
    this.requestUpdate();
    this.emitSelection();
  }

  render() {
    const order = this.rowOrder();
    const span = Math.max(this.columns.length + (this.selectable ? 1 : 0), 1);
    const enabledRows = this.rows.filter((row) => !row.disabled);
    const allSelected = enabledRows.length > 0 && enabledRows.every((row) => row.selected);
    const headingClass = this.stickyHeader ? "ds:sticky ds:top-0 ds:z-10 ds:bg-background" : "";
    return html`
      <div
        class="phsa-root ds:block ds:w-full ds:overflow-auto ds:rounded-lg ds:border ds:border-border ds:bg-background ds:text-foreground ${this.hostClass}"
        aria-busy=${this.loading ? "true" : "false"}
      >
        <table part="table" class="ds:w-full ds:border-collapse ds:text-sm ds:caption-bottom">
          ${this.caption ? html`<caption class="ds:mt-2 ds:text-left ds:text-sm ds:text-muted-foreground">${this.caption}</caption>` : nothing}
          <thead class=${headingClass}>
            <tr class="ds:border-b ds:border-border">
              ${this.selectable
                ? html`
                    <th scope="col" class="ds:h-10 ds:w-10 ds:px-3 ds:align-middle">
                      <input
                        data-select-all
                        part="selection"
                        type="checkbox"
                        class="ds:size-4 ds:accent-primary"
                        aria-label="Selecionar todas as linhas"
                        .checked=${allSelected}
                        ?disabled=${this.loading || enabledRows.length === 0}
                        @change=${(event: Event) => this.toggleAll((event.target as HTMLInputElement).checked)}
                      />
                    </th>
                  `
                : nothing}
              ${this.columns.map(
                (column, index) => html`
                  <th
                    scope="col"
                    aria-sort=${column.sortable ? this.columnSort(column, index) : nothing}
                    style=${column.width ? `width:${column.width}` : nothing}
                    class="ds:h-10 ds:px-3 ds:align-middle ds:font-medium ds:text-muted-foreground ${aligns[column.align] ?? aligns.left}"
                  >
                    ${column.sortable
                      ? html`
                          <button
                            type="button"
                            class="ds:inline-flex ds:items-center ds:gap-1 ds:cursor-pointer ds:border-0 ds:bg-transparent ds:p-0 ds:text-inherit"
                            @click=${() => this.toggleSort(column, index)}
                          >
                            ${column.label} ${this.chevron(column, index)}
                          </button>
                        `
                      : column.label}
                  </th>
                `,
              )}
            </tr>
          </thead>
          <tbody>
            ${this.loading
              ? Array.from({ length: 3 }, (_, rowIndex) => html`
                  <tr class="ds:border-b ds:border-border">
                    ${this.selectable
                      ? html`<td class="ds:w-10 ds:p-3"><phsa-skeleton variant="rectangular" class="size-4"></phsa-skeleton></td>`
                      : nothing}
                    ${this.columns.map(
                      (_, colIndex) => html`
                        <td class="ds:p-3"><phsa-skeleton variant="text" class=${colIndex === 0 ? "w-32" : "w-20"}></phsa-skeleton></td>
                      `,
                    )}
                  </tr>
                `)
              : order.length
              ? order.map((rowIndex, visualIndex) => {
                  const last = visualIndex === order.length - 1;
                  const row = this.rows[rowIndex];
                  return html`
                    <tr class="ds:border-b ds:border-border ds:transition-colors ds:hover:bg-muted/50 ${row?.selected ? "ds:bg-muted/60" : ""} ${row?.disabled ? "ds:opacity-60" : ""} ${last ? "is-last" : ""}">
                      ${this.selectable
                        ? html`
                            <td class="ds:w-10 ds:p-3 ds:align-middle">
                              <input
                                part="selection"
                                type="checkbox"
                                class="ds:size-4 ds:accent-primary"
                                aria-label="Selecionar linha ${this.rowValue(row, rowIndex)}"
                                .checked=${row.selected}
                                ?disabled=${row.disabled}
                                @change=${() => this.toggleRow(row)}
                              />
                            </td>
                          `
                        : nothing}
                      ${this.columns.map((column, colIndex) => {
                        const cell = this.entries[rowIndex][colIndex];
                        return html`
                          <td class="ds:p-3 ds:align-middle ${aligns[column.align] ?? aligns.left}">
                            ${cell ? html`<slot name="c-${rowIndex}-${colIndex}"></slot>` : nothing}
                          </td>
                        `;
                      })}
                    </tr>
                  `;
                })
              : html`
                  <tr class="is-last">
                    <td colspan=${span} class="ds:p-6 ds:text-center ds:text-sm ds:text-muted-foreground">
                      <slot name="empty">Nenhum registro.</slot>
                    </td>
                  </tr>
                `}
          </tbody>
        </table>
      </div>
    `;
  }
}
