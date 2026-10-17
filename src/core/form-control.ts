import { LitElement, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "./phsa-element";

type NativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Base de todos os campos de formulário. O controle nativo fica no shadow e não enxerga
 * o `<form>` da página; esta classe faz a ponte via `ElementInternals`: valor, validação,
 * reset, `disabled` herdado de `<fieldset>` e restauração de estado.
 */
export abstract class PhsaFormControl extends PhsaElement {
  /** @ignore */
  static formAssociated = true;
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property() value = "";
  /** Nome do campo no `<form>`. Igual ao nativo. */
  @property({ reflect: true }) name: string | null = null;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  /** Estado visual de erro (`aria-invalid`). Não bloqueia o envio sozinho. */
  @property({ type: Boolean, reflect: true }) invalid = false;

  /**
   * Preenchidos pelo `<phsa-field>` para acessibilidade.
   * @ignore
   */
  @property({ attribute: false }) fieldLabel = "";
  /** @ignore */
  @property({ attribute: false }) fieldDescription = "";
  /** @ignore */
  @property({ attribute: false }) fieldError = "";

  /** @ignore */
  protected internals = this.attachInternals();
  /** @ignore */
  protected formDisabled = false;
  /**
   * Valor restaurado no reset do `<form>`.
   * @ignore
   */
  protected defaultValue = "";
  /** @ignore */
  private defaultCaptured = false;
  /** @ignore */
  private revealedInvalid = false;
  /** @ignore */
  private readonly onInvalid = () => this.setRevealed(true);

  /** O elemento nativo (`input`, `textarea`, `select`) dentro do shadow. */
  protected abstract get control(): NativeControl | null;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener("invalid", this.onInvalid);
    if (this.defaultCaptured) return;
    this.defaultValue = this.value;
    this.defaultCaptured = true;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("invalid", this.onInvalid);
  }

  /** Igual ao nativo. */
  get validity() {
    return this.internals.validity;
  }

  /** Igual ao nativo. */
  get validationMessage() {
    return this.internals.validationMessage;
  }

  /** Igual ao nativo. */
  checkValidity() {
    this.syncFormState();
    return this.internals.checkValidity();
  }

  /** Igual ao nativo. */
  reportValidity() {
    this.syncFormState();
    return this.internals.reportValidity();
  }

  /** @ignore */
  formResetCallback() {
    this.value = this.defaultValue;
    this.setRevealed(false);
    this.resetControl(this.defaultValue);
    this.syncFormState();
  }

  /** @ignore */
  formDisabledCallback(disabled: boolean) {
    this.formDisabled = disabled;
    this.requestUpdate();
  }

  /** @ignore */
  formStateRestoreCallback(state: string | FormData | File | null) {
    if (typeof state === "string") this.value = state;
  }

  /** @ignore */
  protected get isDisabled() {
    return this.disabled || this.formDisabled;
  }

  /** @ignore */
  protected get showInvalid() {
    return this.invalid || this.revealedInvalid || Boolean(this.fieldError);
  }

  /**
   * Valor enviado no `<form>`.
   * @ignore
   */
  protected formValue(): string | File | FormData | null {
    return this.control?.value ?? null;
  }

  /**
   * Estado guardado para restauração (voltar/autofill). Padrão: o próprio valor.
   * @ignore
   */
  protected formState(): string | File | FormData | null | undefined {
    return undefined;
  }

  /**
   * Leva `this.value` para o controle nativo.
   * @ignore
   */
  protected syncControlValue() {
    const control = this.control;
    if (control && control.value !== this.value) control.value = this.value;
  }

  /**
   * Lê o valor do controle nativo depois de `input`/`change`.
   * @ignore
   */
  protected readControlValue() {
    if (this.control) this.value = this.control.value;
  }

  /** @ignore */
  protected resetControl(defaultValue: string) {
    if (this.control) this.control.value = defaultValue;
  }

  /**
   * Elemento focado quando `reportValidity()` falha. Padrão: o controle nativo.
   * @ignore
   */
  protected validityAnchor(): HTMLElement | null {
    return this.control;
  }

  // O controle interno está no shadow e não enxerga o <form> da página.
  /** @ignore */
  protected syncFormState() {
    const control = this.control;
    const anchor = this.validityAnchor();
    if (!control || !anchor) return;
    this.internals.setFormValue(this.formValue(), this.formState() ?? undefined);
    // disabled/readonly não são validáveis, e o alvo do setValidity precisa poder receber foco.
    if (!control.willValidate) this.internals.setValidity({});
    else this.internals.setValidity(control.validity, control.validationMessage, anchor);
  }

  /**
   * Chamado pelo `<phsa-field>` ao clicar no label.
   * @ignore
   */
  activateFromLabel() {
    this.focus();
  }

  /** @ignore */
  protected override updated() {
    this.syncControlValue();
    this.syncFormState();
  }

  // `input` é composed e já sai do shadow; `change` não, então é redisparado no host.
  // O estado do `<form>` é sincronizado antes, para quem ouve o evento já ler valor/validade atuais.
  /** @ignore */
  protected handleInput() {
    this.readControlValue();
    this.syncControlValue();
    this.syncFormState();
    if (this.revealedInvalid && this.internals.validity.valid) this.setRevealed(false);
  }

  /** @ignore */
  protected handleChange() {
    this.handleInput();
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  // O <form> não vê o controle interno, então :user-invalid não reage ao submit.
  /** @ignore */
  protected handleBlur() {
    if (this.control && !this.control.validity.valid) this.setRevealed(true);
  }

  /**
   * `aria-describedby` do controle quando há descrição ou erro vindos do `<phsa-field>`.
   * @ignore
   */
  protected get describedBy() {
    const ids = [this.fieldError && "phsa-error", this.fieldDescription && "phsa-description"];
    return ids.filter(Boolean).join(" ") || undefined;
  }

  /**
   * Textos referenciados pelo `aria-describedby`, escondidos (o `<phsa-field>` já os mostra).
   * @ignore
   */
  protected renderDescription() {
    return html`
      ${this.fieldError ? html`<span id="phsa-error" hidden>${this.fieldError}</span>` : nothing}
      ${this.fieldDescription ? html`<span id="phsa-description" hidden>${this.fieldDescription}</span>` : nothing}
    `;
  }

  /** @ignore */
  private setRevealed(next: boolean) {
    if (this.revealedInvalid === next) return;
    this.revealedInvalid = next;
    this.requestUpdate();
  }
}
