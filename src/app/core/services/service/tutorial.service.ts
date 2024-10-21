import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { InformationActions, InformationState } from "../../state/information";
import { PopupService } from "./popup.service";
import { TranslateService } from "@ngx-translate/core";
import { Platform } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class TutorialService {
    constructor(
        private store: Store,
        private popupService: PopupService,
        private translateService: TranslateService,
        private platform: Platform
    ) {}

    checkForDualTutorial(mobileLabelId: string, desktopLabelId: string, icon?: string) {
        const labelId = this.isMobile() ? mobileLabelId : desktopLabelId;
        this.checkForTutorial(labelId, icon);
    }

    checkForTutorial(labelId: string, icon?: string) {
        if (this.wasTutorialDisplayed(labelId)) return;
        this.displayTutorial(labelId, icon);
        this.store.dispatch(new InformationActions.SetTutorialDisplayed(labelId));
    }

     private displayTutorial(labelId: string, icon?: string) {
        this.popupService.openSnackbar(
            this.translateService.instant(labelId),
            icon,
            false
        );
    }

    isMobile() {
        return this.platform.is('mobileweb');
    }

    wasTutorialDisplayed(labelId: string) : boolean {
        return !!this.store.selectSnapshot(InformationState.tutorialInfos).find(t => t.labelId === labelId);
    }
}