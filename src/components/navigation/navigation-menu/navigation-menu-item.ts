import { html, nothing, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaAnchored } from "../../../core/anchored";
import { ChevronDown } from "lucide";
import { icon } from "../../../core/icon";
import type { PhsaNavigationMenu } from "./navigation-menu";
import styles from "./navigation-menu-item.css?inline";

const chevron = icon(ChevronDown, "ds:ml-1 ds:size-3.5 ds:shrink-0");

const itemClass =
  "ds:inline-flex ds:h-9 ds:cursor-pointer ds:items-center ds:rounded-md ds:border-0 ds:px-3 ds:text-sm ds:font-medium ds:no-underline ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50";

/**
 * Item de um `phsa-navigation-menu`. Com `href` é um link; sem `href`, o slot vira um painel ancorado no gatilho.
 *
 * @tag phsa-navigation-menu-item
 * @slot trigger - Rótulo do gatilho quando o item tem painel. Se vazio, usa `label`.
 * @slot - Rótulo do link, ou conteúdo do painel quando não há `href`.
 * @csspart trigger - O botão ou o link.
 * @csspart popup - O painel, quando o item não é um link.
 * @fires phsa-toggle - Quando o painel abre ou fecha.
 */
export class PhsaNavigationMenuItem extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  @property() href = "";
  @property() target = "";
  @property() label = "";
  @property({ type: Boolean, reflect: true }) current = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** @ignore */
  autoFocus = false;

  constructor() {
    super();
    this.side = "bottom";
    this.align = "start";
  }

  override focus(options?: FocusOptions) {
    const control = this.renderRoot.querySelector<HTMLElement>("button, a");
    control?.focus(options);
  }

  protected override onTriggerClick() {
    if (this.disabled || this.href) return;
    this.show();
  }

  protected override triggerSlot() {
    return null;
  }

  protected override triggerControl() {
    return this.renderRoot.querySelector<HTMLElement>("button, a");
  }

  protected override focusTrigger() {
    this.triggerControl()?.focus();
  }

  protected override anchorBounds() {
    return this.triggerControl()?.getBoundingClientRect() ?? null;
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if ((this.href || this.disabled) && this.open) this.hide();
    if (changed.has("open") && this.open && this.autoFocus) {
      this.focusPanel();
      this.autoFocus = false;
    }
  }

  /** @ignore */
  private nav() {
    return this.closest("phsa-navigation-menu") as PhsaNavigationMenu | null;
  }

  /** @ignore */
  private focusPanel() {
    const slot = this.layer()?.querySelector("slot");
    const roots = slot?.assignedElements({ flatten: true }) ?? [];
    for (const root of roots) {
      if (root.matches("a, button, [tabindex]:not([tabindex='-1'])")) {
        (root as HTMLElement).focus();
        return;
      }
      const inner = root.querySelector<HTMLElement>("a, button, [tabindex]:not([tabindex='-1'])");
      if (inner) {
        inner.focus();
        return;
      }
    }
    this.layer()?.focus();
  }

  /** @ignore */
  private onEnter() {
    if (this.disabled) return;
    if (this.href) this.nav()?.closeAll();
    else this.show();
  }

  /** @ignore */
  private onTriggerKey(event: KeyboardEvent) {
    if (this.disabled) return;
    const nav = this.nav();
    if (!this.href && (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      this.autoFocus = true;
      this.show();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      nav?.focusRelative(this, -1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      nav?.focusRelative(this, 1);
    }
  }

  render() {
    const tone = this.open || this.current ? "ds:bg-accent ds:text-accent-foreground" : "ds:bg-transparent ds:text-foreground";
    if (this.href) {
      return html`
        <a
          part="trigger"
          href=${this.href}
          target=${this.target || nothing}
          class="phsa-root ${itemClass} ${tone} ${this.hostClass}"
          aria-current=${this.current ? "page" : nothing}
          @pointerenter=${this.onEnter}
          @keydown=${this.onTriggerKey}
        >
          <slot>${this.label}</slot>
        </a>
      `;
    }
    return html`
      <div class="phsa-root ds:inline-block ${this.hostClass}">
        <button
          type="button"
          part="trigger"
          class="${itemClass} ${tone}"
          aria-haspopup="true"
          aria-expanded=${this.open ? "true" : "false"}
          ?disabled=${this.disabled}
          @click=${this.onTriggerClick}
          @keydown=${this.onTriggerKey}
          @pointerenter=${this.onEnter}
        >
          <slot name="trigger">${this.label}</slot>
          ${chevron}
        </button>
        <div
          part="popup"
          popover="manual"
          tabindex="-1"
          class="ds:min-w-48 ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-3 ds:text-sm ds:text-foreground ds:shadow-md"
          style="position:fixed;visibility:hidden"
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
