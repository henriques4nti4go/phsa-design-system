import { unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { PhsaDialog } from "../dialog/dialog";
import styles from "./sheet.css?inline";

export type SheetSide = "right" | "left" | "top" | "bottom";
export const SHEET_SIDES: SheetSide[] = ["right", "left", "top", "bottom"];

/**
 * Painel modal que entra por uma borda da tela.
 *
 * @tag phsa-sheet
 * @slot title - Título. Se vazio, usa `heading`.
 * @slot description - Descrição. Se vazio, usa `description`.
 * @slot - Corpo.
 * @slot footer - Ações.
 * @csspart panel - O painel visível.
 * @fires close - Quando o painel fecha. `detail.reason` explica o motivo.
 */
export class PhsaSheet extends PhsaDialog {
  static styles = [PhsaDialog.styles, unsafeCSS(styles)];

  @property() side: SheetSide = "right";

  protected override get placement() {
    return SHEET_SIDES.includes(this.side) ? this.side : "right";
  }
}
