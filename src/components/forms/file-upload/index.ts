import { PhsaFileUpload } from "./file-upload";

export * from "./file-upload";

if (typeof customElements !== "undefined" && !customElements.get("phsa-file-upload")) {
  customElements.define("phsa-file-upload", PhsaFileUpload);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-file-upload": PhsaFileUpload;
  }
}
