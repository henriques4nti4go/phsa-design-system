import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "./phsa-element";

type NativeControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

/**
 * Base de todos os campos de formulário. O controle nativo fica no shadow e não enxerga
 * o `<form>` da página; esta classe faz a ponte via `ElementInternals`: valor, validação,
 * reset, `disabled` herdado de `<fieldset>` e restauração de estado.
 *
 * Também renderiza label, descrição e erros em volta do controle (`renderControl()`).
 * Sem `error`/`errors`, mostra a mensagem de validação nativa depois do submit ou do blur.
 *
 * @csspart label - O label.
 * @csspart description - O texto de descrição.
 * @csspart error - Cada mensagem de erro.
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

  /** Texto do label. */
  @property() label = "";
  /** Texto de apoio abaixo do campo. */
  @property() description = "";
  /** Mensagem de erro. Tem prioridade sobre a validação nativa. */
  @property() error = "";
  /** Várias mensagens de erro (como atributo, um array JSON). Somam-se a `error`. */
  @property({ type: Array }) errors: string[] = [];

  /**
   * Mensagem da validação nativa, mostrada quando não há `error`/`errors`.
   * @ignore
   */
  @state() private nativeError = "";

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
  private readonly onInvalid = () => {
    this.setRevealed(true);
    this.nativeError = this.validationMessage;
  };

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
    this.nativeError = "";
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
    return this.invalid || this.revealedInvalid || this.messages.length > 0;
  }

  /**
   * Erros mostrados: os passados pelo consumidor ou, sem eles, o da validação nativa.
   * @ignore
   */
  protected get messages() {
    const given = [this.error, ...(Array.isArray(this.errors) ? this.errors : [])].filter(Boolean);
    return given.length ? given : this.nativeError ? [this.nativeError] : [];
  }

  /**
   * Nome acessível do controle (o `<label>` visível fica fora dele, no mesmo shadow).
   * @ignore
   */
  protected get fieldLabel() {
    return this.label;
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
   * Clique no label.
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
    if (this.nativeError) this.nativeError = this.internals.validity.valid ? "" : this.validationMessage;
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
   * `aria-describedby` do controle: descrição e erros visíveis, no mesmo shadow.
   * @ignore
   */
  protected get describedBy() {
    const ids = [this.messages.length && "phsa-error", this.description && "phsa-description"];
    return ids.filter(Boolean).join(" ") || undefined;
  }

  /**
   * Label acima do controle. Checkbox/switch mostram o label ao lado, dentro do controle.
   * @ignore
   */
  protected labelAbove = true;

  /**
   * O controle em si; label, descrição e erros ficam por conta do `render()` da base.
   * @ignore
   */
  protected abstract renderControl(): unknown;

  render() {
    const messages = this.messages;
    return html`
      <div class="phsa-root ${this.labelAbove ? "ds:flex ds:w-full" : "ds:inline-flex"} ds:flex-col ds:gap-1.5">
        ${this.labelAbove && this.label
          ? html`<label
              part="label"
              aria-hidden="true"
              class="ds:text-sm ds:leading-none ds:font-medium ds:text-foreground"
              @click=${this.activateFromLabel}
              >${this.label}</label
            >`
          : nothing}
        ${this.renderControl()}
        ${this.description
          ? html`<p id="phsa-description" part="description" class="ds:m-0 ds:text-xs ds:text-muted-foreground">
              ${this.description}
            </p>`
          : nothing}
        ${messages.length
          ? html`<div id="phsa-error" class="ds:flex ds:flex-col ds:gap-0.5">
              ${messages.map((message) => html`<p part="error" class="ds:m-0 ds:text-xs ds:font-medium ds:text-destructive">${message}</p>`)}
            </div>`
          : nothing}
      </div>
    `;
  }

  /** @ignore */
  private setRevealed(next: boolean) {
    if (this.revealedInvalid === next) return;
    this.revealedInvalid = next;
    this.requestUpdate();
  }
}
