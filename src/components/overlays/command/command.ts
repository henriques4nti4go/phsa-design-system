import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import { Search } from "lucide";
import { icon } from "../../../core/icon";
import type { PhsaCommandItem } from "./command-item";
import styles from "./command.css?inline";

const fold = (value: string) => value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

const searchIcon = icon(Search, "ds:size-4 ds:shrink-0 ds:opacity-50");

type Block =
  | { kind: "group"; label: string; items: PhsaCommandItem[]; loose?: boolean }
  | { kind: "separator" };

type Row =
  | { kind: "group"; label: string; items: PhsaCommandItem[] }
  | { kind: "separator" };

/**
 * Paleta de comandos inline. O texto filtra os itens; Enter ou clique escolhe, e a lista continua aberta.
 * Escape limpa a busca; com a busca vazia, o Escape segue adiante (fecha o dialog em volta, por exemplo).
 *
 * Limitação: o slot só recebe filhos diretos, então os `phsa-command-item` de um grupo viram filhos da
 * paleta. Se o grupo sair da paleta, os itens voltam para ele. Remover um item direto do grupo (como faria
 * um framework) não funciona depois disso; remova o item em si (`item.remove()`) ou o grupo inteiro.
 *
 * @tag phsa-command
 * @slot - `phsa-command-group`, `phsa-command-item` e `phsa-command-separator`.
 * @csspart command - O painel.
 * @csspart input - O campo de busca.
 * @csspart list - A lista de itens.
 * @fires phsa-select - Ao escolher um item. detail.value é o value.
 */
export class PhsaCommand extends PhsaElement {
  static styles = unsafeCSS(styles);

  /** Texto do campo de busca. */
  @property() placeholder = "Buscar...";

  /** @ignore */
  @state() private query = "";
  /** @ignore */
  @state() private active = 0;

  /** @ignore */
  private ready = false;
  /** @ignore */
  private structure: Block[] = [];
  /** Grupo de cada item depois que ele vira filho direto (o slot não alcança netos). */
  private groupOf = new WeakMap<PhsaCommandItem, Element | null>();
  /** @ignore */
  private observer = new MutationObserver(() => {
    this.requestUpdate();
  });

  /** @ignore */
  private watch() {
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["disabled", "value", "label"],
    });
  }

  override connectedCallback() {
    super.connectedCallback();
    this.watch();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  protected override updated(changed: PropertyValues) {
    if (this.ready && (changed.has("active") || changed.has("query"))) {
      this.renderRoot.querySelector<HTMLElement>("[data-active]")?.scrollIntoView({ block: "nearest" });
    }
    this.ready = true;
  }

  /** @ignore */
  private isItem(node: Element): node is PhsaCommandItem {
    return node.localName === "phsa-command-item";
  }

  /**
   * Lê grupos e divisórias, promove os itens a filhos diretos e fixa `slot`.
   * O slot do painel só recebe filhos do host.
   * @ignore
   */
  private layout(): Block[] {
    const blocks: Block[] = [];
    const children = [...this.children];
    for (const node of children) {
      if (node.localName === "phsa-command-separator") {
        blocks.push({ kind: "separator" });
        continue;
      }
      if (node.localName === "phsa-command-group") {
        // Itens já promovidos primeiro, depois os que entraram no grupo agora.
        const lifted = children.filter((child): child is PhsaCommandItem => this.isItem(child) && this.groupOf.get(child) === node);
        const fresh = [...node.children].filter((child): child is PhsaCommandItem => this.isItem(child));
        for (const item of fresh) this.groupOf.set(item, node);
        blocks.push({ kind: "group", label: node.getAttribute("label") ?? "", items: [...lifted, ...fresh] });
        continue;
      }
      if (this.isItem(node) && !this.groupOf.get(node)) {
        const last = blocks.at(-1);
        const bucket = last?.kind === "group" && last.loose ? last : { kind: "group" as const, label: "", items: [], loose: true };
        if (bucket !== last) blocks.push(bucket);
        this.groupOf.set(node, null);
        bucket.items.push(node);
      }
    }
    const ordered = blocks.flatMap((block) => (block.kind === "group" ? block.items : []));
    // Itens de um grupo que saiu da paleta voltam para ele.
    const orphans = children.filter((child): child is PhsaCommandItem => this.isItem(child) && !ordered.includes(child));
    const moving = orphans.length > 0 || ordered.some((item) => item.parentElement !== this);
    if (moving) this.observer.disconnect();
    for (const item of orphans) {
      item.slot = "";
      const group = this.groupOf.get(item);
      if (group) group.appendChild(item);
      this.groupOf.delete(item);
    }
    ordered.forEach((item, index) => {
      const slot = `item-${index}`;
      if (item.slot !== slot) item.slot = slot;
      if (item.parentElement !== this) this.appendChild(item);
    });
    if (moving) {
      this.observer.takeRecords();
      this.watch();
    }
    return blocks;
  }

  /** @ignore */
  private matchesQuery(item: PhsaCommandItem) {
    const query = fold(this.query.trim());
    if (!query) return true;
    return fold(item.textContent?.trim() ?? "").includes(query);
  }

  /** @ignore */
  private rows(): Row[] {
    const rows: Row[] = [];
    let started = false;
    let pendingSep = false;
    for (const block of this.structure) {
      if (block.kind === "separator") {
        if (started) pendingSep = true;
        continue;
      }
      const items = block.items.filter((item) => this.matchesQuery(item));
      if (!items.length) continue;
      if (started && pendingSep) rows.push({ kind: "separator" });
      pendingSep = false;
      started = true;
      rows.push({ kind: "group", label: block.label, items });
    }
    return rows;
  }

  /** @ignore */
  private enabledItems() {
    return this.rows()
      .flatMap((row) => (row.kind === "group" ? row.items : []))
      .filter((item) => !item.disabled);
  }

  /** @ignore */
  private choose(item: PhsaCommandItem) {
    if (item.disabled) return;
    const enabled = this.enabledItems();
    const index = enabled.indexOf(item);
    if (index >= 0) this.active = index;
    const value = item.value || item.textContent?.trim() || "";
    this.dispatchEvent(new CustomEvent("phsa-select", { bubbles: true, composed: true, detail: { value } }));
  }

  /** @ignore */
  private onInput(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.active = 0;
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "Escape") {
      if (!this.query) return;
      event.preventDefault();
      this.query = "";
      this.active = 0;
      return;
    }
    const enabled = this.enabledItems();
    const index = enabled.length ? Math.min(this.active, enabled.length - 1) : -1;
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Home" || event.key === "End") {
      event.preventDefault();
      if (!enabled.length) return;
      if (event.key === "Home") this.active = 0;
      else if (event.key === "End") this.active = enabled.length - 1;
      else if (event.key === "ArrowDown") this.active = Math.min(index + 1, enabled.length - 1);
      else this.active = Math.max(index - 1, 0);
      return;
    }
    if (event.key === "Enter" && index >= 0) {
      event.preventDefault();
      this.choose(enabled[index]);
    }
  }

  render() {
    this.structure = this.layout();
    const rows = this.rows();
    const enabled = rows.flatMap((row) => (row.kind === "group" ? row.items : [])).filter((item) => !item.disabled);
    const current = enabled.length ? Math.min(this.active, enabled.length - 1) : -1;
    const activeItem = current >= 0 ? enabled[current] : undefined;
    return html`
      <div
        part="command"
        class="phsa-root ds:flex ds:w-full ds:flex-col ds:overflow-hidden ds:rounded-md ds:border ds:border-border ds:bg-background ds:text-foreground ds:shadow-md ${this.hostClass}"
        @keydown=${this.onKeydown}
      >
        <div class="ds:flex ds:items-center ds:gap-2 ds:border-b ds:border-border ds:px-3">
          ${searchIcon}
          <input
            part="input"
            type="search"
            autocomplete="off"
            placeholder=${this.placeholder}
            .value=${this.query}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls="list"
            aria-activedescendant=${activeItem?.slot || nothing}
            class="ds:h-10 ds:w-full ds:border-0 ds:bg-transparent ds:text-sm ds:outline-none ds:placeholder:text-muted-foreground"
            @input=${this.onInput}
          />
        </div>
        <div id="list" part="list" role="listbox" class="ds:max-h-72 ds:overflow-auto ds:p-1">
          ${rows.length
            ? rows.map((row) =>
                row.kind === "separator"
                  ? html`<div role="separator" class="ds:my-1 ds:block ds:h-px ds:bg-border"></div>`
                  : html`
                      <div role="group" aria-label=${row.label || nothing}>
                        ${row.label
                          ? html`<div class="ds:px-2 ds:py-1.5 ds:text-xs ds:font-medium ds:text-muted-foreground">${row.label}</div>`
                          : nothing}
                        ${row.items.map((item) => {
                          const on = item === activeItem;
                          const itemClass = item.disabled
                            ? "ds:flex ds:w-full ds:cursor-not-allowed ds:items-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ds:outline-none ds:opacity-50"
                            : on
                              ? "ds:flex ds:w-full ds:cursor-pointer ds:items-center ds:rounded-sm ds:border-0 ds:bg-accent ds:text-accent-foreground ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ds:outline-none"
                              : "ds:flex ds:w-full ds:cursor-pointer ds:items-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:px-2 ds:py-1.5 ds:text-left ds:text-sm ds:outline-none ds:hover:bg-accent ds:hover:text-accent-foreground";
                          return html`
                            <button
                              type="button"
                              id=${item.slot}
                              role="option"
                              class=${itemClass}
                              aria-selected=${on ? "true" : "false"}
                              aria-disabled=${item.disabled ? "true" : "false"}
                              ?disabled=${item.disabled}
                              ?data-active=${on}
                              @mousedown=${(event: Event) => event.preventDefault()}
                              @mouseenter=${() => {
                                if (item.disabled) return;
                                const index = enabled.indexOf(item);
                                if (index >= 0 && index !== this.active) this.active = index;
                              }}
                              @click=${() => this.choose(item)}
                            >
                              <slot name=${item.slot}></slot>
                            </button>
                          `;
                        })}
                      </div>
                    `,
              )
            : html`<p class="ds:px-2 ds:py-6 ds:text-center ds:text-sm ds:text-muted-foreground">Nenhum resultado encontrado.</p>`}
        </div>
      </div>
    `;
  }
}
