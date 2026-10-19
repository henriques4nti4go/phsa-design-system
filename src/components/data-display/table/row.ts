import { html } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";

/**
 * Linha de `<phsa-table>`. Não desenha nada; agrupa as `phsa-cell`.
 *
 * @tag phsa-row
 */
export class PhsaRow extends PhsaElement {
  /** Identificador estável usado na seleção. */
  @property({ reflect: true }) value = "";

  /** Estado de seleção da linha. */
  @property({ type: Boolean, reflect: true }) selected = false;

  /** Impede que a linha seja selecionada. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    return html``;
  }
}
