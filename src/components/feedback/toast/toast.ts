import { html, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { PhsaElement } from "../../../core/phsa-element";
import "../../actions/button";
import styles from "./toast.css?inline";

const tones = {
  default: "ds:text-foreground",
  success: "ds:text-success",
  error: "ds:text-destructive",
  warning: "ds:text-warning",
  info: "ds:text-info",
};

export type ToastVariant = keyof typeof tones;
export const TOAST_VARIANTS = Object.keys(tones) as ToastVariant[];

const positions = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;
export type ToastPosition = (typeof positions)[number];
export const TOAST_POSITIONS = [...positions];

export type ToastOptions = {
  description?: string;
  variant?: ToastVariant;
  /** Milissegundos. `0` deixa até fechar. Padrão: 4000. */
  duration?: number;
  action?: { label: string; onClick: () => void };
};

type ToastRecord = {
  id: number;
  title: string;
  description: string;
  variant: ToastVariant;
  duration: number;
  action?: { label: string; onClick: () => void };
};

type ToastView = ToastRecord & { leaving: boolean };

const LEAVE_MS = 240;

type Timer = { handle: ReturnType<typeof setTimeout> | undefined; start: number; remaining: number };

type ToastStore = {
  subscribers: Set<(items: ToastRecord[]) => void>;
  mounted: HTMLElement[];
  records: ToastRecord[];
  sequence: number;
  timers: Map<number, Timer>;
};

// No globalThis: duas cópias do pacote na página compartilham a mesma pilha.
const STORE = Symbol.for("phsa.toasts");
const shared = globalThis as { [STORE]?: ToastStore };
const store: ToastStore = (shared[STORE] ??= { subscribers: new Set(), mounted: [], records: [], sequence: 1, timers: new Map() } as ToastStore);

function publish() {
  const snapshot = store.records.slice();
  for (const subscriber of store.subscribers) subscriber(snapshot);
}

/** Fecha um toast, ou todos se o id for omitido. */
export function dismissToast(id?: number) {
  if (id === undefined) {
    for (const timer of store.timers.values()) clearTimeout(timer.handle);
    store.timers.clear();
    store.records = [];
  } else {
    clearTimeout(store.timers.get(id)?.handle);
    store.timers.delete(id);
    store.records = store.records.filter((item) => item.id !== id);
  }
  publish();
}

function schedule(item: ToastRecord) {
  if (item.duration <= 0) return;
  clearTimeout(store.timers.get(item.id)?.handle);
  const timer: Timer = { handle: undefined, start: Date.now(), remaining: item.duration };
  timer.handle = setTimeout(() => dismissToast(item.id), item.duration);
  store.timers.set(item.id, timer);
}

/** Pausa o tempo de um toast, guardando o que falta. */
function pause(id: number) {
  const timer = store.timers.get(id);
  if (!timer || timer.handle === undefined) return;
  clearTimeout(timer.handle);
  timer.handle = undefined;
  timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.start));
}

/** Retoma com o tempo que faltava. */
function resume(id: number) {
  const timer = store.timers.get(id);
  if (!timer || timer.handle !== undefined) return;
  timer.start = Date.now();
  timer.handle = setTimeout(() => dismissToast(id), timer.remaining);
}

function push(title: string, options: ToastOptions = {}) {
  // Sem DOM (SSR) não há onde mostrar.
  if (typeof window === "undefined") return 0;
  const item: ToastRecord = {
    id: store.sequence++,
    title,
    description: options.description ?? "",
    variant: options.variant ?? "default",
    duration: options.duration ?? 4000,
    action: options.action,
  };
  store.records = [...store.records, item];
  schedule(item);
  publish();
  return item.id;
}

/**
 * Mostra um toast. O `<phsa-toaster>` precisa estar na página.
 * `toast.success`, `toast.error`, `toast.warning` e `toast.info` fixam a variante.
 */
export function toast(title: string, options?: ToastOptions) {
  return push(title, options);
}

toast.success = (title: string, options?: Omit<ToastOptions, "variant">) => push(title, { ...options, variant: "success" });
toast.error = (title: string, options?: Omit<ToastOptions, "variant">) => push(title, { ...options, variant: "error" });
toast.warning = (title: string, options?: Omit<ToastOptions, "variant">) => push(title, { ...options, variant: "warning" });
toast.info = (title: string, options?: Omit<ToastOptions, "variant">) => push(title, { ...options, variant: "info" });
toast.dismiss = dismissToast;

const icon = (path: string) => html`
  <svg class="ds:mt-0.5 ds:size-4 ds:shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d=${path} />
  </svg>
`;

const icons: Record<ToastVariant, ReturnType<typeof icon>> = {
  default: icon("M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"),
  info: icon("M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0"),
  success: icon("M20 6 9 17l-5-5"),
  warning: icon("m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4M12 17h.01"),
  error: icon("M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0"),
};

/**
 * Pilha de toasts. Um por página. Quem dispara é `toast()`.
 *
 * @tag phsa-toaster
 * @csspart region - A pilha.
 * @csspart toast - Cada aviso.
 */
export class PhsaToaster extends PhsaElement {
  static styles = unsafeCSS(styles);

  @property({ reflect: true }) position: ToastPosition = "bottom-right";

  /** @ignore */
  @state() private items: ToastView[] = [];

  /** @ignore */
  private readonly leaveTimers = new Map<number, number>();
  /**
   * Motivos (`hover`, `focus`) que seguram cada toast.
   * @ignore
   */
  private readonly holds = new Map<number, Set<string>>();
  /**
   * Toast novo: o popover volta ao topo da camada de cima (acima de um modal aberto depois).
   * @ignore
   */
  private raise = false;

  /** @ignore */
  private readonly sync = (next: ToastRecord[]) => {
    if (store.mounted[0] !== this) {
      this.clearLeaves();
      this.items = [];
      return;
    }
    const known = new Set(this.items.map((item) => item.id));
    const added = next.filter((item) => !known.has(item.id));
    if (added.length) {
      this.raise = true;
      for (const item of added) this.announce(item);
    }
    for (const id of this.holds.keys()) if (!next.some((item) => item.id === id)) this.holds.delete(id);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.clearLeaves();
      this.items = next.map((item) => ({ ...item, leaving: false }));
      return;
    }
    const nextIds = new Set(next.map((item) => item.id));
    const merged: ToastView[] = [];
    const seen = new Set<number>();
    for (const current of this.items) {
      if (nextIds.has(current.id)) {
        this.cancelLeave(current.id);
        merged.push({ ...next.find((item) => item.id === current.id)!, leaving: false });
        seen.add(current.id);
        continue;
      }
      merged.push({ ...current, leaving: true });
      this.armLeave(current.id);
    }
    for (const item of next) {
      if (!seen.has(item.id)) merged.push({ ...item, leaving: false });
    }
    this.items = merged;
  };

  override connectedCallback() {
    super.connectedCallback();
    store.mounted.push(this);
    store.subscribers.add(this.sync);
    publish();
  }

  override disconnectedCallback() {
    this.clearLeaves();
    const index = store.mounted.indexOf(this);
    if (index >= 0) store.mounted.splice(index, 1);
    store.subscribers.delete(this.sync);
    for (const id of this.holds.keys()) resume(id);
    this.holds.clear();
    super.disconnectedCallback();
    publish();
  }

  /** @ignore */
  private armLeave(id: number) {
    if (this.leaveTimers.has(id)) return;
    this.leaveTimers.set(id, window.setTimeout(() => this.drop(id), LEAVE_MS + 40));
  }

  /** @ignore */
  private cancelLeave(id: number) {
    const timer = this.leaveTimers.get(id);
    if (timer === undefined) return;
    window.clearTimeout(timer);
    this.leaveTimers.delete(id);
  }

  /** @ignore */
  private clearLeaves() {
    for (const timer of this.leaveTimers.values()) window.clearTimeout(timer);
    this.leaveTimers.clear();
  }

  /** @ignore */
  private drop(id: number) {
    this.cancelLeave(id);
    if (!this.items.some((item) => item.id === id && item.leaving)) return;
    this.items = this.items.filter((item) => item.id !== id);
  }

  /** @ignore */
  private onLeaveEnd(event: TransitionEvent, id: number) {
    if (event.propertyName !== "height" || event.target !== event.currentTarget) return;
    this.drop(id);
  }

  /** @ignore */
  private playLeaves() {
    const nodes = this.renderRoot.querySelectorAll<HTMLElement>("[data-toast-item][data-leaving]:not([data-leave-ready])");
    if (nodes.length === 0) return;
    for (const node of nodes) {
      node.style.height = `${node.getBoundingClientRect().height}px`;
      node.dataset.leaveReady = "";
    }
    this.renderRoot.querySelector<HTMLElement>("[part=region]")?.getBoundingClientRect();
    requestAnimationFrame(() => {
      for (const node of nodes) {
        if (!node.isConnected) continue;
        node.style.height = "0px";
        node.style.marginBottom = "0px";
        node.style.opacity = "0";
      }
    });
  }

  protected override updated() {
    const region = this.renderRoot.querySelector<HTMLElement>("[part=region]");
    if (!region) return;
    this.playLeaves();
    if (this.items.length === 0) {
      if (region.matches(":popover-open")) region.hidePopover();
      return;
    }
    if (region.matches(":popover-open") && this.raise) {
      const active = this.shadowRoot?.activeElement as HTMLElement | null;
      region.hidePopover();
      region.showPopover();
      active?.focus({ preventScroll: true });
    }
    this.raise = false;
    if (!region.matches(":popover-open")) region.showPopover();
    const gap = "1rem";
    const top = this.position.startsWith("top");
    const right = this.position.endsWith("right");
    region.style.inset = "auto";
    region.style.margin = "0";
    region.style.top = top ? gap : "auto";
    region.style.bottom = top ? "auto" : gap;
    region.style.right = right ? gap : "auto";
    region.style.left = right ? "auto" : gap;
  }

  /** @ignore */
  private hold(id: number, reason: string) {
    const reasons = this.holds.get(id) ?? new Set<string>();
    reasons.add(reason);
    this.holds.set(id, reasons);
    pause(id);
  }

  /** @ignore */
  private release(id: number, reason: string) {
    const reasons = this.holds.get(id);
    reasons?.delete(reason);
    if (reasons?.size) return;
    this.holds.delete(id);
    resume(id);
  }

  /** @ignore */
  private onFocusOut(event: FocusEvent, id: number) {
    const current = event.currentTarget as HTMLElement;
    if (event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) return;
    this.release(id, "focus");
  }

  // Live region sempre presente, fora do popover (que some com `display: none` quando vazio).
  /** @ignore */
  private announce(item: ToastRecord) {
    const live = this.renderRoot?.querySelector<HTMLElement>(item.variant === "error" ? "[data-live=assertive]" : "[data-live=polite]");
    if (!live) return;
    const text = item.description ? `${item.title}. ${item.description}` : item.title;
    live.textContent = "";
    // Limpar antes e escrever no frame seguinte faz repetir o anúncio de um texto igual.
    requestAnimationFrame(() => {
      live.textContent = text;
    });
  }

  render() {
    return html`
      <div class="ds:sr-only" data-live="polite" aria-live="polite" aria-atomic="true"></div>
      <div class="ds:sr-only" data-live="assertive" aria-live="assertive" aria-atomic="true"></div>
      <div
        part="region"
        popover="manual"
        role="region"
        aria-label="Notificações"
        data-side=${this.position.endsWith("left") ? "left" : "right"}
        class="phsa-root ds:pointer-events-none ds:fixed ds:z-50 ds:flex ds:max-h-[calc(100vh-2rem)] ds:flex-col ${this.hostClass}"
      >
        ${repeat(
          this.items,
          (item) => item.id,
          (item) => html`
            <div data-toast-item ?data-leaving=${item.leaving} @transitionend=${(event: TransitionEvent) => this.onLeaveEnd(event, item.id)}>
              <div
                part="toast"
                class="ds:pointer-events-auto ds:flex ds:w-full ds:gap-3 ds:rounded-lg ds:border ds:border-border ds:bg-background ds:p-4 ${tones[item.variant] ?? tones.default}"
                @pointerenter=${() => this.hold(item.id, "hover")}
                @pointerleave=${() => this.release(item.id, "hover")}
                @focusin=${() => this.hold(item.id, "focus")}
                @focusout=${(event: FocusEvent) => this.onFocusOut(event, item.id)}
              >
              ${icons[item.variant] ?? icons.default}
              <div class="ds:min-w-0 ds:flex-1">
                <p class="ds:text-sm ds:leading-none ds:font-medium">${item.title}</p>
                ${item.description ? html`<p class="ds:mt-1 ds:text-sm ds:text-muted-foreground">${item.description}</p>` : ""}
                ${item.action
                  ? html`<div class="ds:mt-3">
                      <phsa-button
                        type="button"
                        size="sm"
                        variant="outline"
                        @click=${() => {
                          item.action?.onClick();
                          dismissToast(item.id);
                        }}
                        >${item.action.label}</phsa-button
                      >
                    </div>`
                  : ""}
              </div>
              <button
                type="button"
                class="ds:inline-flex ds:size-6 ds:shrink-0 ds:items-center ds:justify-center ds:rounded-sm ds:border-0 ds:bg-transparent ds:p-0 ds:text-foreground ds:opacity-70 ds:hover:opacity-100 ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:outline-none"
                aria-label="Fechar notificação"
                @click=${() => dismissToast(item.id)}
              >
                ${icon("M18 6 6 18M6 6l12 12")}
              </button>
              </div>
            </div>
          `,
        )}
      </div>
    `;
  }
}
