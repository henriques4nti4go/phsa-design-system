import { noChange } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";

/**
 * Item de uma `phsa-command`. O rótulo fica no light DOM: `display: contents` esconde o texto de um shadow slot.
 *
 * @tag phsa-command-item
 * @slot - Rótulo do item.
 */
export class PhsaCommandItem extends PhsaElement {
  @property({ reflect: true }) value = "";
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected override createRenderRoot() {
    return this;
  }

  /** @ignore */
  protected override render() {
    return noChange;
  }
}
