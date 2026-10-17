import type { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { PhsaElement } from "./phsa-element";

export const ANCHOR_SIDES = ["top", "right", "bottom", "left"] as const;
export const ANCHOR_ALIGNS = ["start", "center", "end"] as const;

export type AnchorSide = (typeof ANCHOR_SIDES)[number];
export type AnchorAlign = (typeof ANCHOR_ALIGNS)[number];

const GAP = 6;
const PAD = 8;

const opposite: Record<AnchorSide, AnchorSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

/** Elemento que dá a caixa do gatilho. `display: contents` no host não tem retângulo; usa o controle interno. */
export function anchorElement(slot: HTMLSlotElement | null): HTMLElement | null {
  const el = slot?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  if (rect.width > 0 || rect.height > 0) return el;
  const inner = el.shadowRoot?.querySelector("button, a, input, [role]") as HTMLElement | null;
  const innerRect = inner?.getBoundingClientRect();
  return inner && innerRect && (innerRect.width > 0 || innerRect.height > 0) ? inner : el;
}

/** Caixa do gatilho. */
export function anchorRect(slot: HTMLSlotElement | null): DOMRect | null {
  return anchorElement(slot)?.getBoundingClientRect() ?? null;
}

/** Sem Popover API o painel fica no fluxo com `position: fixed` e z-index alto. */
const popoverSupported = typeof HTMLElement !== "undefined" && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, "popover");

/** Painéis abertos, do mais antigo ao mais recente. Escape fecha só o do topo. */
const openStack: PhsaAnchored[] = [];

/** Coloca o painel ao lado da âncora. Vira para o lado oposto se não couber. */
export function placeAnchored(layer: HTMLElement, anchor: DOMRect, side: AnchorSide, align: AnchorAlign) {
  layer.style.position = "fixed";
  layer.style.margin = "0";
  layer.style.inset = "auto";
  const width = layer.offsetWidth;
  const height = layer.offsetHeight;
  const space: Record<AnchorSide, number> = {
    top: anchor.top - PAD,
    bottom: window.innerHeight - anchor.bottom - PAD,
    left: anchor.left - PAD,
    right: window.innerWidth - anchor.right - PAD,
  };
  const along = side === "top" || side === "bottom";
  const need = (along ? height : width) + GAP;
  const next = space[side] < need && space[opposite[side]] > space[side] ? opposite[side] : side;
  const cross = (start: number, size: number, length: number) => {
    if (align === "end") return start + size - length;
    if (align === "center") return start + (size - length) / 2;
    return start;
  };
  let top = 0;
  let left = 0;
  if (next === "bottom") {
    top = anchor.bottom + GAP;
    left = cross(anchor.left, anchor.width, width);
  } else if (next === "top") {
    top = anchor.top - height - GAP;
    left = cross(anchor.left, anchor.width, width);
  } else if (next === "right") {
    left = anchor.right + GAP;
    top = cross(anchor.top, anchor.height, height);
  } else {
    left = anchor.left - width - GAP;
    top = cross(anchor.top, anchor.height, height);
  }
  const maxLeft = Math.max(PAD, window.innerWidth - width - PAD);
  const maxTop = Math.max(PAD, window.innerHeight - height - PAD);
  layer.style.left = `${Math.round(Math.min(Math.max(PAD, left), maxLeft))}px`;
  layer.style.top = `${Math.round(Math.min(Math.max(PAD, top), maxTop))}px`;
  layer.style.zIndex = "60";
  layer.style.visibility = "visible";
}

/**
 * Painel na camada de cima, ancorado no slot `trigger`. A subclasse desenha `[part=popup]`.
 */
export class PhsaAnchored extends PhsaElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property() side: AnchorSide = "bottom";
  @property() align: AnchorAlign = "center";

  private listening = false;
  /** @ignore */
  private resizer: ResizeObserver | null = null;

  private readonly onPointer = (event: Event) => {
    if (!event.composedPath().includes(this)) this.hide();
  };

  private readonly onKey = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || event.defaultPrevented || !this.open || openStack.at(-1) !== this) return;
    event.preventDefault();
    const focused = this.matches(":focus-within");
    this.hide();
    if (focused) this.focusTrigger();
  };

  private readonly onMove = () => {
    if (this.open) this.positionLayer();
  };

  /** Abre o painel. */
  show() {
    this.open = true;
  }

  /** Fecha o painel. */
  hide() {
    this.open = false;
  }

  /** Alterna aberto/fechado. */
  toggle() {
    this.open = !this.open;
  }

  /** @ignore */
  protected onTriggerClick() {
    this.toggle();
  }

  /** @ignore */
  protected focusTrigger() {
    const el = this.triggerSlot()?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    el?.focus();
  }

  /** Controle focável do gatilho: o botão interno quando o gatilho é um componente. @ignore */
  protected triggerControl() {
    const el = this.triggerSlot()?.assignedElements({ flatten: true })[0] as HTMLElement | undefined;
    if (!el) return null;
    return (el.shadowRoot?.querySelector("button, a, input, textarea") as HTMLElement | null) ?? el;
  }

  /** @ignore */
  protected layer() {
    return this.renderRoot?.querySelector<HTMLElement>('[part="popup"]') ?? null;
  }

  /** @ignore */
  protected triggerSlot() {
    return this.renderRoot?.querySelector<HTMLSlotElement>('slot[name="trigger"]') ?? null;
  }

  override connectedCallback() {
    super.connectedCallback();
    // Tirar do DOM fecha o popover nativo; ao voltar, reabre se `open` ainda vale.
    if (this.hasUpdated && this.open) this.syncLayer();
  }

  override disconnectedCallback() {
    this.unbind();
    super.disconnectedCallback();
  }

  protected override updated(changed: PropertyValues) {
    super.updated(changed);
    if (changed.has("open") || (this.open && (changed.has("side") || changed.has("align")))) this.syncLayer();
    if (typeof changed.get("open") === "boolean") {
      this.dispatchEvent(new CustomEvent("phsa-toggle", { bubbles: true, composed: true, detail: { open: this.open } }));
    }
  }

  /** @ignore */
  private syncLayer() {
    const layer = this.layer();
    if (!layer) return;
    if (!this.open) {
      this.setShown(layer, false);
      this.unbind();
      return;
    }
    this.setShown(layer, true);
    this.positionLayer();
    requestAnimationFrame(() => {
      if (this.open) this.positionLayer();
    });
    this.bind();
  }

  /** @ignore */
  private setShown(layer: HTMLElement, shown: boolean) {
    if (!popoverSupported) {
      layer.style.display = shown ? "" : "none";
      return;
    }
    if (!layer.isConnected) return;
    const current = layer.matches(":popover-open");
    if (shown && !current) layer.showPopover();
    else if (!shown && current) layer.hidePopover();
  }

  /** @ignore */
  private positionLayer() {
    const layer = this.layer();
    const rect = anchorRect(this.triggerSlot());
    if (!layer || !rect || rect.width === 0) return;
    const side = (ANCHOR_SIDES as readonly string[]).includes(this.side) ? this.side : "bottom";
    const align = (ANCHOR_ALIGNS as readonly string[]).includes(this.align) ? this.align : "center";
    placeAnchored(layer, rect, side, align);
    if (!popoverSupported) layer.style.zIndex = "1000";
  }

  /** @ignore */
  private bind() {
    if (this.listening) return;
    this.listening = true;
    openStack.push(this);
    if (typeof ResizeObserver !== "undefined") {
      this.resizer = new ResizeObserver(this.onMove);
      const anchor = anchorElement(this.triggerSlot());
      if (anchor) this.resizer.observe(anchor);
      const layer = this.layer();
      if (layer) this.resizer.observe(layer);
    }
    document.addEventListener("pointerdown", this.onPointer, true);
    document.addEventListener("keydown", this.onKey);
    window.addEventListener("resize", this.onMove);
    window.addEventListener("scroll", this.onMove, true);
  }

  /** @ignore */
  private unbind() {
    if (!this.listening) return;
    this.listening = false;
    const index = openStack.indexOf(this);
    if (index >= 0) openStack.splice(index, 1);
    this.resizer?.disconnect();
    this.resizer = null;
    document.removeEventListener("pointerdown", this.onPointer, true);
    document.removeEventListener("keydown", this.onKey);
    window.removeEventListener("resize", this.onMove);
    window.removeEventListener("scroll", this.onMove, true);
  }
}
