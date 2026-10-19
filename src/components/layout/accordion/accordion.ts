import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaAccordionItem } from "./accordion-item";
import styles from "./accordion.css?inline";

export type AccordionType = "single" | "multiple";
export const ACCORDION_TYPES: AccordionType[] = ["single", "multiple"];

/**
 * Grupo de seções expansíveis. Em `multiple`, `value` contém os valores abertos
 * separados por vírgula.
 *
 * @tag phsa-accordion
 * @slot - Itens `phsa-accordion-item`.
 * @csspart accordion - O grupo.
 * @fires phsa-change - Ao mudar os itens abertos. `detail.value` contém o novo valor.
 */
export class PhsaAccordion extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() type: AccordionType = "single";
  @property() value = "";

  /** @ignore */
  private readonly observer = new MutationObserver(() => this.sync());

  constructor() {
    super();
    this.addEventListener("phsa-accordion-toggle", ((event: CustomEvent<{ value: string; open: boolean }>) => {
      const item = event.target as Element;
      if (item.localName !== "phsa-accordion-item" || item.closest("phsa-accordion") !== this) return;
      event.stopPropagation();
      const value = event.detail.value;
      if (!value) return;
      if (this.type === "multiple") {
        const values = this.values();
        if (event.detail.open) values.add(value);
        else values.delete(value);
        this.value = [...values].join(",");
      } else {
        this.value = event.detail.open ? value : "";
      }
      this.sync();
      this.dispatchEvent(new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { value: this.value } }));
    }) as EventListener);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ["value", "disabled"] });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    this.sync();
  }

  /** @ignore */
  private items() {
    return [...this.querySelectorAll<PhsaAccordionItem>("phsa-accordion-item")].filter(
      (item) => item.closest("phsa-accordion") === this,
    );
  }

  /** @ignore */
  private values() {
    return new Set(this.value.split(",").map((value) => value.trim()).filter(Boolean));
  }

  /** @ignore */
  private sync() {
    const values = this.type === "multiple" ? this.values() : new Set(this.value ? [this.value] : []);
    for (const item of this.items()) item.open = values.has(item.value);
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const items = this.items().filter((item) => !item.disabled);
    const found = items.findIndex((item) => event.composedPath().includes(item));
    if (found < 0 || !items.length) return;
    event.preventDefault();
    let index = found;
    if (event.key === "Home") index = 0;
    else if (event.key === "End") index = items.length - 1;
    else if (event.key === "ArrowDown") index = (found + 1) % items.length;
    else index = (found - 1 + items.length) % items.length;
    items[index].focus();
  }

  render() {
    return html`
      <div
        part="accordion"
        class="phsa-root ds:w-full ds:border-t ds:border-border ${this.hostClass}"
        @keydown=${this.onKeydown}
      >
        <slot @slotchange=${this.sync}></slot>
      </div>
    `;
  }
}
