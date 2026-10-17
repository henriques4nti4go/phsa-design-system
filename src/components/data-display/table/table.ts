import { html, nothing, svg, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaCell } from "./cell";
import type { PhsaColumn } from "./column";
import type { PhsaRow } from "./row";
import styles from "./table.css?inline";

type SortState = { index: number; direction: "asc" | "desc" };

/**
 * Tabela. Colunas e linhas ficam na luz; cada célula entra num `<td>` pelo slot `c-linha-coluna`.
 *
 * Limitação: o slot só recebe filhos diretos, então as `phsa-cell` saem da `phsa-row` e viram filhas
 * da tabela. Remover ou mover a linha inteira funciona: as células voltam para ela. Remover uma célula
 * direto da linha (`row.removeChild(cell)`, como faz um framework) falha, porque ela não está mais lá;
 * use `cell.remove()` ou recrie a linha.
 *
 * @tag phsa-table
 * @csspart table - O `<table>` nativo.
 */
export class PhsaTable extends PhsaElement {
  static styles = unsafeCSS(styles);

  /** Legenda. Renderizada como `<caption>` quando não está vazia. */
  @property({ reflect: true }) caption = "";

  /** @ignore */
  private sortState: SortState | null = null;

  /** @ignore */
  private columns: PhsaColumn[] = [];

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
      attributeFilter: ["label", "sortable"],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    this.syncFromLightDom();
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
    if (this.sortState && !columns[this.sortState.index]?.sortable) this.sortState = null;

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
    const sort = this.sortState;
    if (!sort) return indices;
    return [...indices].sort((a, b) => {
      const left = this.entries[a][sort.index]?.textContent ?? "";
      const right = this.entries[b][sort.index]?.textContent ?? "";
      const compared = left.localeCompare(right, "pt", { numeric: true, sensitivity: "base" });
      return sort.direction === "asc" ? compared : -compared;
    });
  }

  /** @ignore */
  private toggleSort(index: number) {
    const sort = this.sortState;
    if (!sort || sort.index !== index) this.sortState = { index, direction: "asc" };
    else if (sort.direction === "asc") this.sortState = { index, direction: "desc" };
    else this.sortState = null;
    this.requestUpdate();
  }

  /** @ignore */
  private columnSort(index: number): "ascending" | "descending" | "none" {
    const sort = this.sortState;
    if (!sort || sort.index !== index) return "none";
    return sort.direction === "asc" ? "ascending" : "descending";
  }

  /** @ignore */
  private chevron(index: number) {
    const sort = this.sortState;
    const direction = sort?.index === index ? sort.direction : null;
    if (direction === "asc") {
      return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M3 7.5 6 4.5 9 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    }
    if (direction === "desc") {
      return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M3 4.5 6 7.5 9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    }
    return svg`<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" fill="none"><path d="M2.5 4.25 6 1.75 9.5 4.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2.5 7.75 6 10.25 9.5 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
  }

  render() {
    const order = this.rowOrder();
    const span = Math.max(this.columns.length, 1);
    return html`
      <div class="phsa-root ds:block ds:w-full ds:overflow-x-auto ds:rounded-lg ds:border ds:border-border ds:bg-background ds:text-foreground ${this.hostClass}">
        <table part="table" class="ds:w-full ds:border-collapse ds:text-sm ds:caption-bottom">
          ${this.caption ? html`<caption class="ds:mt-2 ds:text-left ds:text-sm ds:text-muted-foreground">${this.caption}</caption>` : nothing}
          <thead>
            <tr class="ds:border-b ds:border-border">
              ${this.columns.map(
                (column, index) => html`
                  <th scope="col" aria-sort=${column.sortable ? this.columnSort(index) : nothing} class="ds:h-10 ds:px-3 ds:text-left ds:align-middle ds:font-medium ds:text-muted-foreground">
                    ${column.sortable
                      ? html`
                          <button
                            type="button"
                            class="ds:inline-flex ds:items-center ds:gap-1 ds:cursor-pointer ds:border-0 ds:bg-transparent ds:p-0 ds:text-inherit"
                            @click=${() => this.toggleSort(index)}
                          >
                            ${column.label} ${this.chevron(index)}
                          </button>
                        `
                      : column.label}
                  </th>
                `,
              )}
            </tr>
          </thead>
          <tbody>
            ${order.length
              ? order.map((rowIndex, visualIndex) => {
                  const last = visualIndex === order.length - 1;
                  return html`
                    <tr class="ds:border-b ds:border-border ds:transition-colors ds:hover:bg-muted/50 ${last ? "is-last" : ""}">
                      ${this.columns.map((_, colIndex) => {
                        const cell = this.entries[rowIndex][colIndex];
                        return html`<td class="ds:p-3 ds:align-middle">${cell ? html`<slot name="c-${rowIndex}-${colIndex}"></slot>` : nothing}</td>`;
                      })}
                    </tr>
                  `;
                })
              : html`
                  <tr class="is-last">
                    <td colspan=${span} class="ds:p-6 ds:text-center ds:text-sm ds:text-muted-foreground">Nenhum registro.</td>
                  </tr>
                `}
          </tbody>
        </table>
      </div>
    `;
  }
}
