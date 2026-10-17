import { html } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";

/**
 * Coluna de `<phsa-table>`. Não desenha nada; descreve o cabeçalho.
 *
 * @tag phsa-column
 */
export class PhsaColumn extends PhsaElement {
  /** Texto do cabeçalho. */
  @property({ reflect: true }) label = "";

  /** Quando presente, o cabeçalho ordena a coluna. */
  @property({ type: Boolean, reflect: true }) sortable = false;

  render() {
    return html``;
  }
}
