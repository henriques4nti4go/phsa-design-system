import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import type { PhsaToggle } from "./toggle";
import styles from "./toggle.css?inline";

export type ToggleGroupType = "single" | "multiple";
export const TOGGLE_GROUP_TYPES: ToggleGroupType[] = ["single", "multiple"];

/**
 * Grupo de botões de alternância. Em `multiple`, os valores são separados por vírgula.
 *
 * @tag phsa-toggle-group
 * @slot - Itens `phsa-toggle`.
 * @csspart group - O grupo.
 * @fires phsa-change - Ao mudar. `detail.value` contém o novo valor.
 */
export class PhsaToggleGroup extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() type: ToggleGroupType = "single";
  @property() value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property() orientation: "horizontal" | "vertical" = "horizontal";
  /** @ignore */
  private observer = new MutationObserver(() => this.sync());

  constructor() {
    super();
    this.addEventListener("phsa-toggle-select", ((event: CustomEvent<{ value: string }>) => {
      const toggle = event.target as Element;
      if (toggle.localName !== "phsa-toggle" || toggle.closest("phsa-toggle-group") !== this) return;
      event.stopPropagation();
      const value = event.detail.value;
      if (!value || this.disabled) return;
      if (this.type === "multiple") {
        const values = this.values();
        if (values.has(value)) values.delete(value);
        else values.add(value);
        this.value = [...values].join(",");
      } else this.value = this.value === value ? "" : value;
      this.sync();
      this.dispatchEvent(new CustomEvent("phsa-change", { bubbles: true, composed: true, detail: { value: this.value } }));
    }) as EventListener);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, { childList: true, subtree: true, attributes: true, attributeFilter: ["value", "disabled"] });
  }

  override disconnectedCallback() {
    this.observer.disconnect();
    super.disconnectedCallback();
  }

  protected override updated() {
    this.sync();
  }

  /** @ignore */
  private toggles() {
    return [...this.querySelectorAll<PhsaToggle>("phsa-toggle")].filter((toggle) => toggle.closest("phsa-toggle-group") === this);
  }

  /** @ignore */
  private values() {
    return new Set(this.value.split(",").map((value) => value.trim()).filter(Boolean));
  }

  /** @ignore */
  private sync() {
    const values = this.type === "multiple" ? this.values() : new Set(this.value ? [this.value] : []);
    for (const toggle of this.toggles()) {
      toggle.pressed = values.has(toggle.value);
    }
  }

  /** @ignore */
  private onKeydown(event: KeyboardEvent) {
    const vertical = this.orientation === "vertical";
    const forward = vertical ? "ArrowDown" : "ArrowRight";
    const backward = vertical ? "ArrowUp" : "ArrowLeft";
    if (![forward, backward, "Home", "End"].includes(event.key)) return;
    if (this.disabled) return;
    const toggles = this.toggles().filter((toggle) => !toggle.disabled);
    const found = toggles.findIndex((toggle) => event.composedPath().includes(toggle));
    if (found < 0 || !toggles.length) return;
    event.preventDefault();
    const index =
      event.key === "Home" ? 0 :
      event.key === "End" ? toggles.length - 1 :
      event.key === forward ? (found + 1) % toggles.length :
      (found - 1 + toggles.length) % toggles.length;
    toggles[index].focus();
  }

  render() {
    return html`
      <div
        part="group"
        role="group"
        aria-orientation=${this.orientation}
        aria-disabled=${this.disabled ? "true" : "false"}
        class="phsa-root ds:inline-flex ${this.orientation === "vertical" ? "ds:flex-col" : "ds:flex-row"} ds:items-stretch ds:gap-1 ${this.disabled ? "ds:pointer-events-none ds:opacity-50" : ""} ${this.hostClass}"
        @keydown=${this.onKeydown}
      ><slot @slotchange=${this.sync}></slot></div>
    `;
  }
}
