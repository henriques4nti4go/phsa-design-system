import { PhsaAvatarGroup } from "./avatar-group";
import { PhsaAvatar } from "./avatar";

export * from "./avatar-group";
export * from "./avatar";

if (typeof customElements !== "undefined") {
  if (!customElements.get("phsa-avatar")) customElements.define("phsa-avatar", PhsaAvatar);
  if (!customElements.get("phsa-avatar-group")) customElements.define("phsa-avatar-group", PhsaAvatarGroup);
}

declare global {
  interface HTMLElementTagNameMap {
    "phsa-avatar": PhsaAvatar;
    "phsa-avatar-group": PhsaAvatarGroup;
  }
}
