import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { PopUpService } from "./pop-up.service";
import { TranslateService } from "@ngx-translate/core";
import { Platform } from "@ionic/angular";
import { InformationActions, InformationState } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class TutorialService {
    constructor(
        private store: Store,
        private popUpService: PopUpService,
        private translateService: TranslateService,
        private platform: Platform
    ) {}

    // ToDo: Move to state and delete

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
        this.popUpService.openSnackbar(
            this.translateService.instant(labelId),
            icon,
            false,
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