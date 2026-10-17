import { html } from "lit";
import { property } from "lit/decorators.js";
import "../../actions/button";
import { PhsaDialog } from "../dialog/dialog";

export type AlertDialogVariant = "default" | "destructive";
export const ALERT_DIALOG_VARIANTS: AlertDialogVariant[] = ["default", "destructive"];

/**
 * Confirmação. Não fecha no overlay. Escape e o botão cancelar disparam `phsa-cancel`;
 * o botão principal dispara `phsa-confirm`.
 *
 * @tag phsa-alert-dialog
 * @slot title - Título. Se vazio, usa o atributo `heading`.
 * @slot description - Descrição. Se vazio, usa o atributo `description`.
 * @slot - Corpo, entre a descrição e os botões.
 * @slot footer - Substitui os botões padrão.
 * @csspart panel - A caixa visível.
 * @fires close - Quando fecha. `detail.reason` é `confirm` ou `cancel`.
 * @fires phsa-confirm - Ao confirmar.
 * @fires phsa-cancel - Ao cancelar, inclusive pelo Escape.
 */
export class PhsaAlertDialog extends PhsaDialog {
  static styles = PhsaDialog.styles;

  @property({ attribute: "confirm-label" }) confirmLabel = "Continuar";
  @property({ attribute: "cancel-label" }) cancelLabel = "Cancelar";
  @property() variant: AlertDialogVariant = "default";

  protected override get closedBy() {
    return "closerequest" as const;
  }

  protected override get dialogRole() {
    return "alertdialog";
  }

  protected override get showClose() {
    return false;
  }

  protected override renderFooter() {
    const variant = this.variant === "destructive" ? "destructive" : "default";
    return html`
      <phsa-button type="button" variant="outline" data-initial-focus @click=${() => this.close("cancel")}>${this.cancelLabel}</phsa-button>
      <phsa-button type="button" variant=${variant} @click=${() => this.close("confirm")}>${this.confirmLabel}</phsa-button>
    `;
  }

  protected override onDismissed(reason: string) {
    super.onDismissed(reason);
    if (reason === "confirm") this.dispatchEvent(new Event("phsa-confirm", { bubbles: true, composed: true }));
    if (reason === "cancel") this.dispatchEvent(new Event("phsa-cancel", { bubbles: true, composed: true }));
  }
}
