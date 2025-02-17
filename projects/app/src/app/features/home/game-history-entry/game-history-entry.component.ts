import { Component, HostListener, Input } from "@angular/core";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";
import { GameHistoryEntry } from "projects/app/src/app/core/models/interfaces";
import { PopupService } from "projects/app/src/app/core/services/service/popup.service";

@Component({
    selector: 'game-history-entry',
    templateUrl: './game-history-entry.component.html'
})
export class GameHistoryEntryComponent {
    @Input() gameHistoryEntry: GameHistoryEntry;

    constructor(
        private navController: NavController,
        private popupService: PopupService,
        private translateService: TranslateService,

    ) {}

    @HostListener("click") onClick(){
        firstValueFrom(this.popupService.openOptionBottomSheet(
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