import { PhsaOtpInput } from "./otp-input";

export * from "./otp-input";

if (typeof customElements !== "undefined" && !customElements.get("phsa-otp-input")) {
  customElements.define("phsa-otp-input", PhsaOtpInput);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-otp-input": PhsaOtpInput;
  }
}
