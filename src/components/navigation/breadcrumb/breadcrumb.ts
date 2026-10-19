import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./breadcrumb.css?inline";

/**
 * Trilha de navegação hierárquica.
 *
 * @tag phsa-breadcrumb
 * @slot - Itens `phsa-breadcrumb-item`.
 * @csspart navigation - O elemento de navegação.
 * @csspart list - A lista de itens.
 */
export class PhsaBreadcrumb extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() label = "Navegação estrutural";

  render() {
    return html`
      <nav part="navigation" aria-label=${this.label} class="phsa-root ds:block ${this.hostClass}">
        <ol part="list" class="ds:m-0 ds:flex ds:list-none ds:flex-wrap ds:items-center ds:gap-1.5 ds:p-0 ds:text-sm ds:text-muted-foreground">
          <slot></slot>
        </ol>
      </nav>
    `;
  }
}
