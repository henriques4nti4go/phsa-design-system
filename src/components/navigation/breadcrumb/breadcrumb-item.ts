import { html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import { ChevronRight } from "lucide";
import { icon } from "../../../core/icon";
import styles from "./breadcrumb.css?inline";

const separator = icon(ChevronRight, "ds:size-3.5");

/**
 * Item de um `phsa-breadcrumb`.
 *
 * @tag phsa-breadcrumb-item
 * @slot - Rótulo do item.
 * @slot separator - Separador customizado.
 * @csspart item - O item.
 * @csspart link - O link, quando `href` está presente.
 * @csspart separator - O separador.
 */
export class PhsaBreadcrumbItem extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() href = "";
  @property() target = "";
  @property({ type: Boolean, reflect: true }) current = false;

  render() {
    return html`
      <span part="item" role="listitem" class="phsa-root ds:inline-flex ds:items-center ds:gap-1.5 ${this.hostClass}">
        <span part="separator" class="separator ds:inline-flex ds:items-center" aria-hidden="true">
          <slot name="separator">${separator}</slot>
        </span>
        ${this.href && !this.current
          ? html`
              <a
                part="link"
                href=${this.href}
                target=${this.target || nothing}
                class="ds:text-muted-foreground ds:underline-offset-4 ds:hover:text-foreground ds:hover:underline ds:focus-visible:rounded-sm ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring"
              ><slot></slot></a>
            `
          : html`
              <span aria-current=${this.current ? "page" : nothing} class="ds:font-medium ds:text-foreground">
                <slot></slot>
              </span>
            `}
      </span>
    `;
  }
}
