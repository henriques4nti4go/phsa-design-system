import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import { ChevronLeft, ChevronRight } from "lucide";
import { icon } from "../../../core/icon";
import styles from "./pagination.css?inline";

type PageToken = number | "start-ellipsis" | "end-ellipsis";

const previousIcon = icon(ChevronLeft, "ds:size-4");
const nextIcon = icon(ChevronRight, "ds:size-4");

/**
 * Navegação entre páginas.
 *
 * @tag phsa-pagination
 * @csspart list - A lista de controles.
 * @csspart item - Cada botão de página.
 * @csspart ellipsis - Uma lacuna entre páginas.
 * @fires phsa-change - Ao mudar de página. `detail.page` contém a nova página.
 */
export class PhsaPagination extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) page = 1;
  @property({ type: Number, attribute: "page-count" }) pageCount = 1;
  @property({ type: Number, attribute: "sibling-count" }) siblingCount = 1;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() label = "Paginação";

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    const normalized = this.currentPage();
    if (this.page !== normalized) this.page = normalized;
  }

  /** @ignore */
  private total() {
    return Math.max(1, Math.floor(Number.isFinite(this.pageCount) ? this.pageCount : 1));
  }

  /** @ignore */
  private currentPage() {
    return Math.min(Math.max(1, Math.floor(Number.isFinite(this.page) ? this.page : 1)), this.total());
  }

  /** @ignore */
  private tokens(): PageToken[] {
    const total = this.total();
    const siblings = Math.max(0, Math.floor(Number.isFinite(this.siblingCount) ? this.siblingCount : 1));
    if (total <= siblings * 2 + 5) return Array.from({ length: total }, (_, index) => index + 1);

    const current = this.currentPage();
    const left = Math.max(2, Math.min(current - siblings, total - (siblings * 2 + 2)));
    const right = Math.min(total - 1, Math.max(current + siblings, siblings * 2 + 3));
    const tokens: PageToken[] = [1];
    if (left > 2) tokens.push(left === 3 ? 2 : "start-ellipsis");
    for (let page = left; page <= right; page++) tokens.push(page);
    if (right < total - 1) tokens.push(right === total - 2 ? total - 1 : "end-ellipsis");
    tokens.push(total);
    return tokens;
  }

  /** @ignore */
  private go(page: number) {
    const next = Math.min(Math.max(1, page), this.total());
    if (this.disabled || next === this.currentPage()) return;
    this.page = next;
    this.dispatchEvent(new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { page: next } }));
  }

  /** @ignore */
  private pageButton(page: number) {
    const current = page === this.currentPage();
    return html`
      <li>
        <button
          type="button"
          part="item"
          class="ds:inline-flex ds:size-9 ds:items-center ds:justify-center ds:rounded-md ds:border ds:text-sm ds:font-medium ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${current ? "ds:border-primary ds:bg-primary ds:text-primary-foreground" : "ds:border-border ds:bg-background ds:text-foreground ds:hover:bg-accent ds:hover:text-accent-foreground"}"
          aria-label="Página ${page}"
          aria-current=${current ? "page" : nothing}
          ?disabled=${this.disabled}
          @click=${() => this.go(page)}
        >
          ${page}
        </button>
      </li>
    `;
  }

  render() {
    const current = this.currentPage();
    const total = this.total();
    return html`
      <nav aria-label=${this.label} class="phsa-root ds:block ${this.hostClass}">
        <ul part="list" class="ds:m-0 ds:flex ds:list-none ds:items-center ds:gap-1 ds:p-0">
          <li>
            <button
              type="button"
              part="item"
              class="ds:inline-flex ds:size-9 ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-border ds:bg-background ds:text-foreground ds:outline-none ds:hover:bg-accent ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
              aria-label="Página anterior"
              ?disabled=${this.disabled || current === 1}
              @click=${() => this.go(current - 1)}
            >${previousIcon}</button>
          </li>
          ${this.tokens().map((token) =>
            typeof token === "number"
              ? this.pageButton(token)
              : html`<li part="ellipsis" aria-hidden="true" class="ds:flex ds:size-9 ds:items-center ds:justify-center">…</li>`,
          )}
          <li>
            <button
              type="button"
              part="item"
              class="ds:inline-flex ds:size-9 ds:items-center ds:justify-center ds:rounded-md ds:border ds:border-border ds:bg-background ds:text-foreground ds:outline-none ds:hover:bg-accent ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
              aria-label="Próxima página"
              ?disabled=${this.disabled || current === total}
              @click=${() => this.go(current + 1)}
            >${nextIcon}</button>
          </li>
        </ul>
      </nav>
    `;
  }
}
