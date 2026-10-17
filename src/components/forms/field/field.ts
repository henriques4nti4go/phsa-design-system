import { html, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./field.css?inline";

/**
 * Label, descrição e mensagem de erro em volta de um campo do DS.
 * Sem `error`, mostra a mensagem de validação nativa quando o `<form>` é enviado inválido.
 *
 * @tag phsa-field
 * @slot - O campo (`<phsa-input>`, ...).
 * @csspart label - O label.
 * @csspart description - O texto de descrição.
 * @csspart error - A mensagem de erro.
 */
export class PhsaField extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() label = "";
  @property() description = "";
  /** Mensagem de erro. Tem prioridade sobre a validação nativa. */
  @property() error = "";

  /** @ignore */
  @state() private nativeError = "";

  /** @ignore */
  private get control() {
    return Array.from(this.children).find((el): el is PhsaFormControl => el instanceof PhsaFormControl) ?? null;
  }

  /** @ignore */
  private get shownError() {
    return this.error || this.nativeError;
  }

  // `invalid` não borbulha, mas passa pela fase de captura do ancestral.
  /** @ignore */
  private readonly onInvalid = (event: Event) => {
    const control = this.control;
    if (control && event.target === control) this.nativeError = control.validationMessage;
  };

  /** @ignore */
  private readonly onInput = async () => {
    const control = this.control;
    if (!this.nativeError || !control) return;
    await control.updateComplete;
    this.nativeError = control.validity.valid ? "" : control.validationMessage;
  };

  /** @ignore */
  private form: HTMLFormElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("invalid", this.onInvalid, true);
    this.addEventListener("input", this.onInput);
    // `reset` dispara no <form>, não nos descendentes.
    this.form = this.closest("form");
    this.form?.addEventListener("reset", this.clearNativeError);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("invalid", this.onInvalid, true);
    this.removeEventListener("input", this.onInput);
    this.form?.removeEventListener("reset", this.clearNativeError);
    this.form = null;
  }

  /** @ignore */
  private readonly clearNativeError = () => {
    this.nativeError = "";
  };

  protected override updated() {
    const control = this.control;
    if (!control) return;
    control.fieldLabel = this.label;
    control.fieldDescription = this.description;
    control.fieldError = this.shownError;
  }

  /** @ignore */
  private focusControl() {
    this.control?.activateFromLabel();
  }

  render() {
    return html`
      <div class="phsa-root ds:flex ds:flex-col ds:gap-1.5 ${this.hostClass}">
        ${this.label
          ? html`<label
              part="label"
              aria-hidden="true"
              class="ds:text-sm ds:leading-none ds:font-medium"
              @click=${this.focusControl}
              >${this.label}</label
            >`
          : nothing}
        <slot @slotchange=${() => this.requestUpdate()}></slot>
        ${this.description
          ? html`<p part="description" class="ds:text-xs ds:text-muted-foreground">${this.description}</p>`
          : nothing}
        ${this.shownError
          ? html`<p part="error" class="ds:text-xs ds:font-medium ds:text-destructive">${this.shownError}</p>`
          : nothing}
      </div>
    `;
  }
}
