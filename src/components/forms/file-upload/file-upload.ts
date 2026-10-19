import { html, nothing, unsafeCSS } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, state } from "lit/decorators.js";
import { PhsaFormControl } from "../../../core/form-control";
import styles from "./file-upload.css?inline";

const uploadIcon = html`
  <svg class="ds:size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 16V4m0 0L7 9m5-5 5 5"></path><path d="M4 15v4h16v-4"></path>
  </svg>
`;

/**
 * Seletor de arquivos com suporte a arrastar e soltar.
 *
 * @tag phsa-file-upload
 * @csspart dropzone - A área de seleção.
 * @csspart list - A lista de arquivos.
 * @csspart remove - O botão de remoção.
 */
export class PhsaFileUpload extends PhsaFormControl {
  static styles = unsafeCSS(styles);

  @property() accept = "";
  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ attribute: false }) files: File[] = [];
  @property({ attribute: "button-label" }) buttonLabel = "Selecionar arquivos";
  @property({ attribute: "drop-label" }) dropLabel = "ou arraste e solte aqui";
  @state() private dragging = false;

  /** @ignore */
  protected get control() {
    return this.renderRoot?.querySelector<HTMLInputElement>("input[type=file]") ?? null;
  }

  /** @ignore */
  protected override validityAnchor() {
    return this.renderRoot?.querySelector<HTMLElement>("[part=dropzone]") ?? null;
  }

  /** @ignore */
  protected override formValue() {
    if (!this.files.length) return null;
    if (!this.multiple) return this.files[0];
    const data = new FormData();
    for (const file of this.files) data.append(this.name || "file", file);
    return data;
  }

  /** @ignore */
  protected override formState() {
    return this.formValue();
  }

  /** @ignore */
  protected override syncControlValue() {
    const input = this.control;
    if (!input || typeof DataTransfer === "undefined") return;
    const transfer = new DataTransfer();
    for (const file of this.files) transfer.items.add(file);
    input.files = transfer.files;
  }

  /** @ignore */
  protected override readControlValue() {
    this.files = Array.from(this.control?.files ?? []);
  }

  /** @ignore */
  protected override resetControl() {
    this.files = [];
    if (this.control) this.control.value = "";
  }

  /** Remove todos os arquivos. */
  clear() {
    this.files = [];
    if (this.control) this.control.value = "";
    this.syncFormState();
    this.requestUpdate();
  }

  /** @ignore */
  private choose() {
    if (!this.isDisabled) this.control?.click();
  }

  /** @ignore */
  private onChange() {
    this.handleChange();
  }

  /** @ignore */
  private accepts(file: File) {
    const rules = this.accept.split(",").map((rule) => rule.trim().toLowerCase()).filter(Boolean);
    if (!rules.length) return true;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) =>
      rule.startsWith(".") ? name.endsWith(rule) : rule.endsWith("/*") ? type.startsWith(rule.slice(0, -1)) : type === rule,
    );
  }

  /** @ignore */
  private setDropped(files: File[]) {
    const accepted = files.filter((file) => this.accepts(file));
    this.files = this.multiple ? accepted : accepted.slice(0, 1);
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** @ignore */
  private onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    if (this.isDisabled) return;
    this.setDropped(Array.from(event.dataTransfer?.files ?? []));
  }

  /** @ignore */
  private removeFile(index: number) {
    this.files = this.files.filter((_, fileIndex) => fileIndex !== index);
    this.syncControlValue();
    this.syncFormState();
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true }));
  }

  protected renderControl() {
    return html`
      <button
        type="button"
        part="dropzone"
        aria-label=${ifDefined(this.fieldLabel || this.buttonLabel)}
        aria-describedby=${ifDefined(this.describedBy)}
        aria-invalid=${ifDefined(this.showInvalid ? "true" : undefined)}
        ?disabled=${this.isDisabled}
        class="phsa-root ds:flex ds:w-full ds:flex-col ds:items-center ds:justify-center ds:gap-2 ds:rounded-lg ds:border ds:border-dashed ds:border-input ds:bg-transparent ds:px-6 ds:py-8 ds:text-center ds:text-sm ds:text-foreground ds:cursor-pointer ds:outline-none ds:transition-colors ds:hover:bg-muted/50 ds:focus-visible:ring-2 ds:focus-visible:ring-ring ds:focus-visible:ring-offset-2 ds:disabled:cursor-not-allowed ds:disabled:opacity-50 ds:aria-invalid:border-destructive ${this.dragging ? "ds:border-primary ds:bg-muted/50" : ""} ${this.hostClass}"
        @click=${this.choose}
        @dragenter=${(event: DragEvent) => {
          event.preventDefault();
          if (!this.isDisabled) this.dragging = true;
        }}
        @dragover=${(event: DragEvent) => event.preventDefault()}
        @dragleave=${() => {
          this.dragging = false;
        }}
        @drop=${this.onDrop}
      >
        ${uploadIcon}
        <span class="ds:font-medium">${this.buttonLabel}</span>
        <span class="ds:text-xs ds:text-muted-foreground">${this.dropLabel}</span>
      </button>
      <input
        type="file"
        class="ds:sr-only"
        tabindex="-1"
        accept=${ifDefined(this.accept || undefined)}
        ?multiple=${this.multiple}
        ?required=${this.required}
        ?disabled=${this.isDisabled}
        @change=${this.onChange}
      />
      ${this.files.length
        ? html`
            <ul part="list" class="ds:m-0 ds:flex ds:list-none ds:flex-col ds:gap-2 ds:p-0">
              ${this.files.map(
                (file, index) => html`
                  <li class="ds:flex ds:items-center ds:justify-between ds:gap-3 ds:rounded-md ds:bg-muted ds:px-3 ds:py-2 ds:text-sm">
                    <span class="ds:min-w-0 ds:truncate">${file.name}</span>
                    <span class="ds:shrink-0 ds:text-xs ds:text-muted-foreground">${formatBytes(file.size)}</span>
                    <button
                      part="remove"
                      type="button"
                      class="ds:shrink-0 ds:rounded-sm ds:border-0 ds:bg-transparent ds:text-muted-foreground ds:cursor-pointer ds:hover:text-foreground ds:focus-visible:outline-none ds:focus-visible:ring-2 ds:focus-visible:ring-ring"
                      aria-label="Remover ${file.name}"
                      ?disabled=${this.isDisabled}
                      @click=${() => this.removeFile(index)}
                    >×</button>
                  </li>
                `,
              )}
            </ul>
          `
        : nothing}
    `;
  }
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
