import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaTab } from "./tab";
import type { PhsaTabPanel } from "./tab-panel";
import styles from "./tabs.css?inline";

const orientations = ["horizontal", "vertical"] as const;
export type TabsOrientation = (typeof orientations)[number];
export const TABS_ORIENTATIONS: TabsOrientation[] = [...orientations];

/**
 * Troca de painéis. Filhos `phsa-tab` (slot `tab`) e `phsa-tab-panel`. Abas aninhadas não se misturam:
 * cada `phsa-tabs` só enxerga as abas e painéis dele.
 *
 * @tag phsa-tabs
 * @slot tab - Os `phsa-tab`.
 * @slot - Os `phsa-tab-panel`.
 * @csspart list - A faixa de abas.
 * @fires phsa-change - Quando a aba ativa muda. `detail.value` é o valor dela. Não dispara ao escolher a primeira aba sozinho.
 */
export class PhsaTabs extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() value = "";
  @property() orientation: TabsOrientation = "horizontal";

  /** @ignore */
  private silent = false;

  constructor() {
    super();
    this.addEventListener("phsa-tab-select", ((event: CustomEvent<{ value: string }>) => {
      const tab = event.target as Element;
      if (tab.localName !== "phsa-tab" || tab.closest("phsa-tabs") !== this) return;
      event.stopPropagation();
      if (event.detail?.value && event.detail.value !== this.value) this.value = event.detail.value;
    }) as EventListener);
  }

  // Antes do render, para não agendar um segundo update.
  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    this.pickFirst();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    const silent = this.silent;
    this.silent = false;
    if (!silent && typeof changed.get("value") === "string") {
      this.dispatchEvent(new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { value: this.value } }));
    }
    this.sync();
  }

  /** @ignore */
  private tabs() {
    return [...this.querySelectorAll<PhsaTab>("phsa-tab")].filter((tab) => tab.closest("phsa-tabs") === this);
  }

  /** @ignore */
  private panels() {
    return [...this.querySelectorAll<PhsaTabPanel>("phsa-tab-panel")].filter((panel) => panel.closest("phsa-tabs") === this);
  }

  /**
   * Sem `value`, seleciona a primeira aba habilitada. Escolha automática: sem `phsa-change`.
   * @ignore
   */
  private pickFirst() {
    if (this.value) return;
    const first = this.tabs().find((tab) => !tab.disabled);
    if (!first) return;
    this.silent = true;
    this.value = first.value;
  }

  /** @ignore */
  private onSlotChange() {
    this.pickFirst();
    this.sync();
  }

  /** @ignore */
  private sync() {
    const tabs = this.tabs();
    const panels = this.panels();
    for (const tab of tabs) {
      tab.selected = tab.value === this.value;
      tab.panel = panels.find((panel) => panel.value === tab.value) ?? null;
    }
    for (const panel of panels) {
      panel.selected = panel.value === this.value;
      panel.tab = tabs.find((tab) => tab.value === panel.value) ?? null;
    }
    const list = this.renderRoot.querySelector<HTMLElement>("[part=list]");
    if (list) list.setAttribute("aria-orientation", this.orientation === "vertical" ? "vertical" : "horizontal");
  }

  /** @ignore */
  private onKey(event: KeyboardEvent) {
    const tabs = this.tabs().filter((tab) => !tab.disabled);
    if (!tabs.length) return;
    const found = tabs.findIndex((tab) => event.composedPath().includes(tab));
    const index = found < 0 ? 0 : found;
    const go = (to: number) => {
      event.preventDefault();
      const tab = tabs[(to + tabs.length) % tabs.length];
      this.value = tab.value;
      tab.focus();
    };
    const forward = this.orientation === "vertical" ? "ArrowDown" : "ArrowRight";
    const back = this.orientation === "vertical" ? "ArrowUp" : "ArrowLeft";
    if (event.key === forward) go(index + 1);
    else if (event.key === back) go(index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(tabs.length - 1);
  }

  render() {
    const vertical = this.orientation === "vertical";
    const list = vertical
      ? "ds:flex ds:flex-col ds:items-stretch ds:rounded-md ds:bg-muted ds:p-1 ds:text-muted-foreground"
      : "ds:inline-flex ds:h-10 ds:items-center ds:rounded-md ds:bg-muted ds:p-1 ds:text-muted-foreground";
    return html`
      <div class="phsa-root ${vertical ? "ds:flex ds:items-start ds:gap-4" : "ds:block"} ${this.hostClass}">
        <div part="list" role="tablist" class=${list} @keydown=${this.onKey}>
          <slot name="tab" @slotchange=${this.onSlotChange}></slot>
        </div>
        <div class="ds:min-w-0 ds:flex-1 ${vertical ? "" : "ds:mt-2"}">
          <slot @slotchange=${this.onSlotChange}></slot>
        </div>
      </div>
    `;
  }
}
