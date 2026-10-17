import { html, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import { PhsaRadio } from "../radio/radio";
import styles from "./radio-group.css?inline";

const orientations = {
  vertical: "ds:flex ds:flex-col ds:gap-2",
  horizontal: "ds:flex ds:flex-row ds:flex-wrap ds:gap-4",
};

export type RadioOrientation = keyof typeof orientations;
export const RADIO_ORIENTATIONS = Object.keys(orientations) as RadioOrientation[];

/**
 * Grupo de `<phsa-radio>`. Uma opção por vez; as setas movem a seleção.
 *
 * @tag phsa-radio-group
 * @slot - Opções `<phsa-radio>`.
 * @csspart group - O agrupamento.
 */
export class PhsaRadioGroup extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  /** `vertical` ou `horizontal`. */
  @property() orientation: RadioOrientation = "vertical";

  /**
   * Já teve valor (do grupo, do usuário ou de um radio). Até lá, o `checked` dos radios define o valor.
   * @ignore
   */
  private settled = false;

  /** @ignore */
  private observer = new MutationObserver((records) => {
    let changed = false;
    for (const record of records) {
      if (record.attributeName === "checked") this.syncFromRadio(record.target);
      else if (record.target !== this) changed = true;
    }
    if (changed) this.requestUpdate();
  });

  override connectedCallback() {
    this.adoptChecked();
    super.connectedCallback();
    this.addEventListener("keydown", this.onKeydown);
    this.addEventListener("phsa-radio", this.onRadio);
    this.observer.observe(this, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value", "disabled", "checked"],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.onKeydown);
    this.removeEventListener("phsa-radio", this.onRadio);
    this.observer.disconnect();
  }

  override focus(options?: FocusOptions) {
    this.tabTarget()?.focus(options);
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=group]") ?? null;
  }

  /** @ignore */
  private readonly onGroupFocus = (event: FocusEvent) => {
    if (event.target !== event.currentTarget) return;
    this.tabTarget()?.focus();
  };

  /** @ignore */
  protected override formValue() {
    return this.value || null;
  }

  // O controle é um radio nativo: `required` sem seleção dá o `valueMissing` do browser.
  // Precisa de `name`: o Chrome ignora `required` em radio sem nome.
  /** @ignore */
  protected override syncControlValue() {
    const control = this.control;
    if (!control) return;
    control.value = this.value;
    control.checked = this.value !== "";
  }

  /** @ignore */
  protected override readControlValue() {}

  /** @ignore */
  protected override resetControl() {
    this.syncControlValue();
  }

  /** @ignore */
  protected override willUpdate() {
    this.adoptChecked();
  }

  /** @ignore */
  protected override updated() {
    super.updated();
    const tab = this.tabTarget();
    for (const radio of this.radios()) {
      radio.groupDisabled = this.isDisabled;
      radio.markedInvalid = this.showInvalid;
      radio.checked = this.value !== "" && radio.value === this.value;
      radio.setTabStop(radio === tab);
    }
  }

  /** @ignore */
  private radios() {
    return ([...this.querySelectorAll("phsa-radio")] as PhsaRadio[]).filter(
      (radio) => radio.closest("phsa-radio-group") === this,
    );
  }

  /** @ignore */
  private enabledRadios() {
    return this.radios().filter((radio) => !radio.disabled && !radio.groupDisabled);
  }

  /** @ignore */
  private tabTarget() {
    const enabled = this.enabledRadios();
    return enabled.find((radio) => radio.value === this.value) ?? enabled[0] ?? null;
  }

  // Radios que chegam depois (ou ainda sem upgrade) trazem o `checked` declarado no HTML.
  /** @ignore */
  private adoptChecked() {
    if (this.value) this.settled = true;
    if (this.settled) return;
    const checked = this.radios().find((radio) => radio.checked || radio.hasAttribute("checked"));
    if (!checked) return;
    this.value = checked.value;
    this.defaultValue = checked.value;
    this.settled = true;
  }

  // `radio.checked = ...` programático: o grupo acompanha, sem disparar eventos (igual ao nativo).
  /** @ignore */
  private syncFromRadio(target: Node) {
    if (!(target instanceof PhsaRadio) || !this.radios().includes(target)) return;
    if (target.checked && target.value !== this.value) this.value = target.value;
    else if (!target.checked && this.value && target.value === this.value) this.value = "";
  }

  /** @ignore */
  private select(radio: PhsaRadio) {
    this.settled = true;
    if (radio.value === this.value) return;
    this.value = radio.value;
    this.syncControlValue();
    this.handleInput();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** @ignore */
  private readonly onRadio = (event: Event) => {
    const radio = event.target;
    if (!(radio instanceof PhsaRadio) || !this.radios().includes(radio) || radio.disabled) return;
    this.select(radio);
  };

  /** @ignore */
  private readonly onKeydown = (event: KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
    const radios = this.enabledRadios();
    if (!radios.length) return;
    event.preventDefault();
    const current = event.target instanceof PhsaRadio ? radios.indexOf(event.target) : -1;
    let next = 0;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = radios.length - 1;
    else if (current < 0) next = 0;
    else if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % radios.length;
    else next = (current - 1 + radios.length) % radios.length;
    const radio = radios[next];
    this.select(radio);
    radio.focus();
  };

  render() {
    return html`
      <div
        part="group"
        role="radiogroup"
        class="phsa-root ${orientations[this.orientation] ?? orientations.vertical} ${this.hostClass}"
        tabindex="-1"
        @focus=${this.onGroupFocus}
        aria-label=${ifDefined(this.fieldLabel || undefined)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        aria-required=${ifDefined(this.required ? "true" : undefined)}
        aria-orientation=${this.orientation}
      >
        <slot @slotchange=${() => this.requestUpdate()}></slot>
        <input
          data-control
          type="radio"
          name="phsa-required"
          class="ds:sr-only"
          tabindex="-1"
          aria-hidden="true"
          ?required=${this.required}
          ?disabled=${this.isDisabled}
        />
        ${this.renderDescription()}
      </div>
    `;
  }
}
