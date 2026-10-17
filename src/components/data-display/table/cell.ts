import { html } from "lit";
import { PhsaElement } from "../../../core/phsa-element";

/**
 * Célula de `<phsa-table>`. O conteúdo (texto ou outros elementos) aparece na coluna.
 *
 * @tag phsa-cell
 * @slot - Conteúdo da célula.
 */
export class PhsaCell extends PhsaElement {
  render() {
    return html`<slot></slot>`;
  }
}
