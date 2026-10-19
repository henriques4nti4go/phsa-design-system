import { LitElement, html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./step.css?inline";

const check = html`
  <svg class="ds:size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
`;

/**
 * Etapa de um `phsa-stepper`.
 *
 * @tag phsa-step
 * @slot - Descrição. Se vazio, usa `description`.
 * @csspart step - O botão da etapa.
 * @csspart marker - O indicador numérico.
 * @csspart connector - A linha até a próxima etapa.
 * @fires phsa-step-select - Interno: pede a troca ao stepper dono.
 */
export class PhsaStep extends PhsaElement {
  static styles = unsafeCSS(styles);
  /** @ignore */
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ reflect: true }) value = "";
  @property() heading = "";
  @property() description = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** @ignore */
  @property({ type: Boolean, attribute: false }) current = false;
  /** @ignore */
  @property({ type: Boolean, attribute: false }) completed = false;
  /** Índice 1-based mostrado no marcador. @ignore */
  @property({ type: Number, attribute: false }) index = 1;
  /** @ignore */
  @property({ attribute: false }) orientation: "horizontal" | "vertical" = "horizontal";

  override focus(options?: FocusOptions) {
    this.renderRoot.querySelector("button")?.focus(options);
  }

  /** @ignore */
  private pick() {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent("phsa-step-select", { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  render() {
    const marker = this.completed
      ? "ds:border-primary ds:bg-primary ds:text-primary-foreground"
      : this.current
        ? "ds:border-primary ds:bg-background ds:text-foreground"
        : "ds:border-border ds:bg-muted ds:text-muted-foreground";
    return html`
      <div class="phsa-root ds:flex ds:min-w-0 ds:flex-1 ${this.orientation === "vertical" ? "ds:flex-col ds:items-stretch" : "ds:items-start"} ${this.hostClass}">
        <button
          type="button"
          part="step"
          class="ds:flex ds:min-w-0 ds:flex-1 ds:cursor-pointer ds:items-start ds:gap-3 ds:border-0 ds:bg-transparent ds:p-0 ds:text-left ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50"
          aria-current=${this.current ? "step" : nothing}
          ?disabled=${this.disabled}
          @click=${this.pick}
        >
          <span part="marker" class="ds:mt-0.5 ds:inline-flex ds:size-8 ds:shrink-0 ds:items-center ds:justify-center ds:rounded-full ds:border ds:text-sm ds:font-medium ${marker}">
            ${this.completed ? check : this.index}
          </span>
          <span class="ds:min-w-0 ds:pt-1">
            <span class="ds:block ds:text-sm ds:font-medium ${this.current || this.completed ? "ds:text-foreground" : "ds:text-muted-foreground"}">${this.heading || this.value}</span>
            <span class="ds:mt-0.5 ds:block ds:text-xs ds:text-muted-foreground"><slot>${this.description}</slot></span>
          </span>
        </button>
        <span
          part="connector"
          class="connector ds:bg-border ${this.orientation === "vertical" ? "ds:ml-[0.95rem] ds:mt-2 ds:mb-2 ds:h-6 ds:w-px ds:min-w-0 ds:flex-none" : "ds:mx-3 ds:mt-4 ds:h-px ds:min-w-6 ds:flex-1"}"
          aria-hidden="true"
        ></span>
      </div>
    `;
  }
}
