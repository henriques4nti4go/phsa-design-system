import { html } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";

/**
 * Grupo de uma `phsa-command`. Marca os itens e o rótulo; a paleta desenha.
 *
 * @tag phsa-command-group
 */
export class PhsaCommandGroup extends PhsaElement {
  @property({ reflect: true }) label = "";

  render() {
    return html``;
  }
}
