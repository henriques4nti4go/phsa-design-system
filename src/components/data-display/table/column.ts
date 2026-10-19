import { html } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";

export type ColumnAlign = "left" | "center" | "right";
export const COLUMN_ALIGNS: ColumnAlign[] = ["left", "center", "right"];

/**
 * Coluna de `<phsa-table>`. Não desenha nada; descreve o cabeçalho.
 *
 * @tag phsa-column
 */
export class PhsaColumn extends PhsaElement {
  /** Identificador estável usado na ordenação. */
  @property({ reflect: true }) key = "";

  /** Texto do cabeçalho. */
  @property({ reflect: true }) label = "";

  /** Quando presente, o cabeçalho ordena a coluna. */
  @property({ type: Boolean, reflect: true }) sortable = false;

  /** Alinhamento do cabeçalho e das células. */
  @property({ reflect: true }) align: ColumnAlign = "left";

  /** Largura CSS da coluna, por exemplo `12rem` ou `30%`. */
  @property({ reflect: true }) width = "";

  render() {
    return html``;
  }
}
