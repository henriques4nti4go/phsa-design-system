import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "./form-control";

/**
 * Checkbox e switch: o estado é `checked` e o `<form>` só recebe `value` quando marcado.
 */
export abstract class PhsaToggle extends PhsaFormControl {
  @property({ type: Boolean, reflect: true }) checked = false;

  /** @ignore */
  @state() protected slotted = false;
  /** @ignore */
  private defaultChecked = false;
  /** @ignore */
  private captured = false;

  override connectedCallback() {
    if (!this.captured) {
      this.defaultChecked = this.checked;
      this.captured = true;
    }
    super.connectedCallback();
    this.addEventListener("click", this.onHostClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.onHostClick);
  }

  /** @ignore */
  override formResetCallback() {
    this.checked = this.defaultChecked;
    super.formResetCallback();
  }

  /** @ignore */
  override formStateRestoreCallback(state: string | FormData | File | null) {
    this.checked = state === "checked";
  }

  override focus(options?: FocusOptions) {
    const anchor = this.validityAnchor();
    if (anchor) anchor.focus(options);
    else super.focus(options);
  }

  /** @ignore */
  override activateFromLabel() {
    if (this.isDisabled) return;
    this.focus();
    this.toggle();
  }

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[data-control]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector("button") ?? null;
  }

  /** @ignore */
  protected override formValue() {
    return this.checked ? this.value || "on" : null;
  }

  // O valor some do `<form>` quando desmarcado; o estado guarda o `checked` para restaurar.
  /** @ignore */
  protected override formState() {
    return this.checked ? "checked" : "unchecked";
  }

  /** @ignore */
  protected override syncControlValue() {
    const input = this.control;
    if (!input) return;
    input.checked = this.checked;
    input.value = this.value || "on";
  }

  /** @ignore */
  protected override readControlValue() {
    if (this.control) this.checked = this.control.checked;
  }

  /** @ignore */
  protected override resetControl() {
    this.syncControlValue();
  }

  /** @ignore */
  protected override labelAbove = false;

  /**
   * Texto ao lado da caixa: o slot ou, sem ele, o `label`.
   * @ignore
   */
  protected renderText() {
    return html`<slot @slotchange=${this.onSlot}></slot>${!this.slotted && this.label ? this.label : nothing}`;
  }

  /** @ignore */
  protected onSlot = (event: Event) => {
    const has = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .some((node) => node.textContent?.trim());
    if (has !== this.slotted) this.slotted = has;
  };

  /** @ignore */
  protected onControlClick = () => {
    this.toggle();
  };

  // `<label for>` e `host.click()` disparam o click no host. O que passou pelo botão já alternou.
  /** @ignore */
  private readonly onHostClick = (event: Event) => {
    const button = this.validityAnchor();
    if (button && event.composedPath().includes(button)) return;
    this.toggle();
  };

  /** @ignore */
  protected toggle() {
    if (this.isDisabled) return;
    this.checked = !this.checked;
    this.syncControlValue();
    this.handleInput();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }
}
