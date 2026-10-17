import { html, unsafeCSS } from "lit";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./dropdown-separator.css?inline";

/**
 * Divisória dentro de um `phsa-dropdown-menu`.
 *
 * @tag phsa-dropdown-separator
 * @csspart separator - A linha.
 */
export class PhsaDropdownSeparator extends PhsaElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`<div part="separator" role="separator" class="phsa-root ds:my-1 ds:block ds:h-px ds:bg-border ${this.hostClass}"></div>`;
  }
}
