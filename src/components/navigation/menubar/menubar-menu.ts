import { html, unsafeCSS, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaAnchored } from "../../../core/anchored";
import "../../overlays/dropdown-menu";
import type { PhsaDropdownItem } from "../../overlays/dropdown-menu/dropdown-item";
import type { PhsaMenubar } from "./menubar";
import styles from "./menubar-menu.css?inline";

/**
 * Menu de um `phsa-menubar`. O gatilho é o `label` (ou o slot `trigger`); os itens são `phsa-dropdown-item`.
 *
 * @tag phsa-menubar-menu
 * @slot trigger - Rótulo do gatilho. Se vazio, usa `label`.
 * @slot - `phsa-dropdown-item` e `phsa-dropdown-separator`.
 * @csspart trigger - O botão que abre.
 * @csspart popup - O menu.
 * @fires phsa-toggle - Quando abre ou fecha.
 * @fires phsa-select - Quando um item é ativado. `detail.value` vem do item.
 */
export class PhsaMenubarMenu extends PhsaAnchored {
  static styles = unsafeCSS(styles);

  @property() label = "";
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** @ignore */
  @property({ type: Boolean, attribute: false }) tabbable = false;
  /** @ignore */
  landing: "first" | "last" = "first";
  /** @ignore */
  autoFocus = false;
  /** @ignore */
  private typed = "";
  /** @ignore */
  private typedTimer = 0;

  constructor() {
    super();
    this.side = "bottom";
    this.align = "start";
    this.addEventListener("phsa-select", (event: Event) => {
      const item = event.target as Element;
      if (item.localName !== "phsa-dropdown-item" || item.closest("phsa-menubar-menu") !== this) return;
      this.hide();
      this.focusTrigger();
    });
  }

  override focus(options?: FocusOptions) {
    this.triggerControl()?.focus(options);
  }

  protected override onTriggerClick() {
    if (this.disabled) return;
    this.toggle();
  }

  protected override triggerSlot() {
    return null;
  }

  protected override triggerControl() {
    return this.renderRoot.querySelector("button");
  }

  protected override focusTrigger() {
    this.triggerControl()?.focus();
  }

  protected override anchorBounds() {
    return this.triggerControl()?.getBoundingClientRect() ?? null;
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (this.disabled && this.open) this.hide();
    if (changed.has("open") && this.open && this.autoFocus) {
      const items = this.enabled();
      (this.landing === "last" ? items.at(-1) : items[0])?.focus();
      this.landing = "first";
      this.autoFocus = false;
    }
  }

  /** @ignore */
  private bar() {
    return this.closest("phsa-menubar") as PhsaMenubar | null;
  }

  /** @ignore */
  private items() {
    return [...this.querySelectorAll<PhsaDropdownItem>("phsa-dropdown-item")].filter(
      (item) => item.closest("phsa-menubar-menu") === this,
    );
  }

  /** @ignore */
  private enabled() {
    return this.items().filter((item) => !item.disabled);
  }

  /** @ignore */
  private onTriggerEnter() {
    if (this.disabled || !this.bar()?.isArmed()) return;
    this.show();
  }

  /** @ignore */
  private onTriggerKey(event: KeyboardEvent) {
    if (this.disabled) return;
    const bar = this.bar();
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      this.landing = event.key === "ArrowUp" ? "last" : "first";
      this.autoFocus = true;
      if (!this.open) this.show();
      else {
        const items = this.enabled();
        (this.landing === "last" ? items.at(-1) : items[0])?.focus();
        this.landing = "first";
        this.autoFocus = false;
      }
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.autoFocus = true;
      this.toggle();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      bar?.focusRelative(this, -1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      bar?.focusRelative(this, 1);
    }
  }

  /** @ignore */
  private onMenuKey(event: KeyboardEvent) {
    const bar = this.bar();
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      bar?.focusRelative(this, -1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      bar?.focusRelative(this, 1);
      return;
    }
    const items = this.enabled();
    if (!items.length) return;
    const found = items.findIndex((item) => event.composedPath().includes(item));
    const index = found < 0 ? 0 : found;
    const go = (to: number) => {
      event.preventDefault();
      items[(to + items.length) % items.length]?.focus();
    };
    if (event.key === "ArrowDown") go(found < 0 ? 0 : index + 1);
    else if (event.key === "ArrowUp") go(found < 0 ? items.length - 1 : index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(items.length - 1);
    else if (event.key.length === 1 && event.key !== " " && !event.altKey && !event.ctrlKey && !event.metaKey) {
      window.clearTimeout(this.typedTimer);
      this.typed += event.key.toLocaleLowerCase();
      this.typedTimer = window.setTimeout(() => (this.typed = ""), 500);
      const start = this.typed.length === 1 ? index + 1 : index;
      for (let step = 0; step < items.length; step++) {
        const at = (start + step) % items.length;
        if ((items[at].textContent?.trim().toLocaleLowerCase() ?? "").startsWith(this.typed)) {
          go(at);
          break;
        }
      }
    }
  }

  render() {
    const on = this.open ? "ds:bg-accent ds:text-accent-foreground" : "ds:bg-transparent ds:text-foreground";
    return html`
      <div class="phsa-root ds:inline-block">
        <button
          type="button"
          part="trigger"
          role="menuitem"
          class="ds:inline-flex ds:h-8 ds:cursor-pointer ds:items-center ds:rounded-sm ds:border-0 ds:px-3 ds:text-sm ds:font-medium ds:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ${on}"
          aria-haspopup="menu"
          aria-expanded=${this.open ? "true" : "false"}
          tabindex=${this.tabbable && !this.disabled ? 0 : -1}
          ?disabled=${this.disabled}
          @click=${this.onTriggerClick}
          @keydown=${this.onTriggerKey}
          @pointerenter=${this.onTriggerEnter}
        >
          <slot name="trigger">${this.label}</slot>
        </button>
        <div
          part="popup"
          popover="manual"
          role="menu"
          class="ds:flex ds:min-w-32 ds:flex-col ds:rounded-md ds:border ds:border-border ds:bg-background ds:p-1 ds:text-foreground ds:shadow-md ${this.hostClass}"
          style="position:fixed;visibility:hidden"
          @keydown=${this.onMenuKey}
        >
          <slot></slot>
        </div>
      </div>
    `;
  }
}
