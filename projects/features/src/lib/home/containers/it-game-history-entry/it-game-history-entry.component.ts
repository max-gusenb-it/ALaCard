import { Component, HostListener, Input } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";
import { GameHistoryEntry, PopUpService } from "@shared";

@Component({
    selector: 'it-game-history-entry',
    templateUrl: './it-game-history-entry.component.html'
})
export class ItGameHistoryEntryComponent {
    @Input() gameHistoryEntry: GameHistoryEntry;

    constructor(
        private navController: NavController,
        private popUpService: PopUpService,
        private translateService: TranslateService,

    ) {}

    @HostListener("click") onClick(){
        firstValueFrom(this.popUpService.openOptionBottomSheet(
            `${this.translateService.instant("features.home.game-history-entry.join-dialog.title-1")} ${this.gameHistoryEntry.roomCreatorUsername}${this.translateService.instant("features.home.game-history-entry.join-dialog.title-2")}`,
            this.translateService.instant("actions.cancel"),
            this.translateService.instant("actions.join"),
        ).closed).then(joinRoom => {
            if (joinRoom) {
                this.navController.navigateForward(`/room/${this.gameHistoryEntry.roomCreatorId}-${this.gameHistoryEntry.roomId}`);
            }
        })
    }
}