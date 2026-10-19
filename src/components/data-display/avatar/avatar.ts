import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { PhsaElement } from "../../../core/phsa-element";
import styles from "./avatar.css?inline";

const sizes = {
  sm: "ds:size-8 ds:text-xs",
  default: "ds:size-10 ds:text-sm",
  lg: "ds:size-12 ds:text-base",
};

export type AvatarSize = keyof typeof sizes;
export const AVATAR_SIZES = Object.keys(sizes) as AvatarSize[];

/**
 * Imagem de perfil com fallback por iniciais.
 *
 * @tag phsa-avatar
 * @csspart avatar - O contêiner.
 * @csspart image - A imagem.
 * @csspart fallback - O fallback.
 */
export class PhsaAvatar extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property() src = "";
  @property() alt = "";
  @property() name = "";
  @property() size: AvatarSize = "default";
  @property() shape: "circle" | "square" = "circle";
  @state() private failed = false;

  protected override willUpdate(changed: PropertyValues) {
    super.willUpdate(changed);
    if (changed.has("src")) this.failed = false;
  }

  /** @ignore */
  private initials() {
    const words = (this.name || this.alt).trim().split(/\s+/).filter(Boolean);
    return words.slice(0, 2).map((word) => word[0]).join("").toLocaleUpperCase();
  }

  render() {
    const label = this.alt || this.name;
    const rounded = this.shape === "square" ? "ds:rounded-md" : "ds:rounded-full";
    const initials = this.initials();
    return html`
      <span
        part="avatar"
        role=${this.src && !this.failed ? nothing : label ? "img" : nothing}
        aria-label=${this.src && !this.failed ? nothing : label || nothing}
        aria-hidden=${!label ? "true" : nothing}
        class="phsa-root ds:inline-flex ds:shrink-0 ds:items-center ds:justify-center ds:overflow-hidden ds:bg-muted ds:font-medium ds:text-muted-foreground ${rounded} ${sizes[this.size] ?? sizes.default} ${this.hostClass}"
      >
        ${this.src && !this.failed
          ? html`
              <img
                part="image"
                src=${this.src}
                alt=${this.alt}
                class="ds:size-full ds:object-cover"
                @error=${() => {
                  this.failed = true;
                }}
              />
            `
          : html`
              <span part="fallback" aria-hidden="true">
                ${initials || html`
                  <svg class="ds:size-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="4"></circle><path d="M4 21a8 8 0 0 1 16 0"></path>
                  </svg>
                `}
              </span>
            `}
      </span>
    `;
  }
}
