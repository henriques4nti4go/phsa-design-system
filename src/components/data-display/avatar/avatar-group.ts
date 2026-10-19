import { html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./avatar.css?inline";

/**
 * Grupo sobreposto de avatares.
 *
 * @tag phsa-avatar-group
 * @slot - Avatares.
 * @csspart group - O grupo.
 * @csspart overflow - A quantidade que não está visível.
 */
export class PhsaAvatarGroup extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ type: Number }) max = 3;
  @state() private overflow = 0;
  /** @ignore */
  private observer = new MutationObserver(() => this.sync());

  override connectedCallback() {
    super.connectedCallback();
    this.observer.observe(this, { childList: true });
  }

  override disconnectedCallback() {
    this.observer.disconnect();
    for (const avatar of this.avatars()) avatar.hidden = false;
    super.disconnectedCallback();
  }

  protected override updated() {
    this.sync();
  }

  /** @ignore */
  private avatars() {
    return [...this.children].filter((child): child is HTMLElement => child.localName === "phsa-avatar");
  }

  /** @ignore */
  private sync() {
    const avatars = this.avatars();
    const max = Math.max(0, Math.floor(this.max));
    avatars.forEach((avatar, index) => {
      avatar.hidden = index >= max;
    });
    const overflow = Math.max(0, avatars.length - max);
    if (overflow !== this.overflow) this.overflow = overflow;
  }

  render() {
    return html`
      <div part="group" role="group" class="phsa-root ds:inline-flex ds:items-center ${this.hostClass}">
        <slot @slotchange=${this.sync}></slot>
        ${this.overflow
          ? html`
              <span
                part="overflow"
                aria-label="${this.overflow} pessoas adicionais"
                class="ds:-ml-2 ds:inline-flex ds:size-10 ds:items-center ds:justify-center ds:rounded-full ds:border-2 ds:border-background ds:bg-muted ds:text-xs ds:font-medium ds:text-muted-foreground"
              >+${this.overflow}</span>
            `
          : ""}
      </div>
    `;
  }
}
