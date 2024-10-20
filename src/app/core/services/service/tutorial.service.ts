import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { InformationActions, InformationState } from "../../state/information";
import { PopupService } from "./popup.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class TutorialService {
    constructor(
        private store: Store,
        private popupService: PopupService,
        private translateService: TranslateService
    ) {}

    displayTutorial(labelId: string, icon?: string) {
        this.popupService.openSnackbar(
            this.translateService.instant(labelId),
            icon,
            false
        );
        this.store.dispatch(new InformationActions.SetTutorialDisplayed(labelId));
    }

    wasTutorialDisplayed(labelId: string) : boolean {
        return !!this.store.selectSnapshot(InformationState.tutorialInfos).find(t => t.labelId === labelId);
    }
}