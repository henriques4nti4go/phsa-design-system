import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./tab-panel.css?inline";

/**
 * Painel de um `phsa-tabs`. Visível quando o `value` é o da aba ativa.
 *
 * @tag phsa-tab-panel
 * @slot - Conteúdo do painel.
 * @csspart panel - O container.
 */
export class PhsaTabPanel extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ reflect: true }) value = "";
  /** @ignore */
  @property({ attribute: false }) selected = false;
  /** Aba deste painel, ligada pelo `phsa-tabs`. @ignore */
  @property({ attribute: false }) tab: HTMLElement | null = null;

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (!changed.has("tab")) return;
    // `aria-labelledby` por id não atravessa shadow roots: referência por elemento, ou o texto da aba.
    const panel = this.renderRoot.querySelector<HTMLElement>("[part=panel]");
    if (!panel) return;
    if ("ariaLabelledByElements" in Element.prototype) panel.ariaLabelledByElements = this.tab ? [this.tab] : null;
    else if (this.tab) panel.setAttribute("aria-label", this.tab.textContent?.trim() ?? "");
    else panel.removeAttribute("aria-label");
  }

  render() {
    return html`
      <div part="panel" role="tabpanel" ?hidden=${!this.selected} tabindex="0" class="phsa-root ds:block ds:rounded-sm ds:text-sm ds:text-foreground ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ${this.hostClass}"><slot></slot></div>
    `;
  }
}
