import { LitElement, type CSSResultGroup } from "lit";
import { baseStyles } from "../styles/base";
import { hostUtilities } from "../styles/host-utilities";

/**
 * Base de todos os componentes: aplica a base do DS, a ponte de utilities do projeto
 * e repassa o `class` do host para o elemento raiz interno.
 */
export class PhsaElement extends LitElement {
  static get observedAttributes() {
    return [...super.observedAttributes, "class"];
  }

  protected static finalizeStyles(styles?: CSSResultGroup) {
    // A ponte entra por último: as classes do projeto vencem as do DS.
    return [baseStyles, ...super.finalizeStyles(styles), ...(hostUtilities ? [hostUtilities] : [])];
  }

  attributeChangedCallback(name: string, old: string | null, value: string | null) {
    super.attributeChangedCallback(name, old, value);
    if (name === "class") this.requestUpdate();
  }

  /** Classes que o projeto passou no componente, para aplicar no elemento raiz. */
  protected get hostClass() {
    return this.getAttribute("class") ?? "";
  }
}
