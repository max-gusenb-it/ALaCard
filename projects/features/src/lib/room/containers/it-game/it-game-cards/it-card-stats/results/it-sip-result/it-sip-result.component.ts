import { Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Player, SipResult } from "@features";
import { PopUpService } from "@shared";

@Component({
  selector: 'it-sip-result',
  templateUrl: './it-sip-result.component.html',
  styleUrl: './it-sip-result.component.scss'
})
export class ItSipResultComponent {
  @Input() sipResult: SipResult;
  @Input() player: Player;

  constructor(
    private translateService: TranslateService,
    private popUpService: PopUpService
  ) { }

  openSnackbar() {
    let action = "";
    if (this.sipResult.distribute) {
      action = this.translateService.instant("shared.components.display.it-sip-result.distribution");
    } else {
      action = this.translateService.instant("shared.components.display.it-sip-result.drink");
    }

    const sip = this.translateService.instant("shared.components.display.it-result.sip");
    const sips = this.translateService.instant("shared.components.display.it-result.sips");
    

    this.popUpService.openSnackbar(
      `${this.player.username} ${action} ${this.sipResult.sips} ${this.sipResult.sips > 1 ? sips : sip}`,
      undefined,
      true,
      true,
      2000
    );
  }
}