import { ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { CreateAccountFormData } from "src/app/core/models/interfaces";
import { PopupService } from "src/app/core/services/service/popup.service";
import { AuthenticationActions } from "src/app/core/state";

@Component({
    selector: 'it-add-account-modal',
    templateUrl: './it-add-account-modal.component.html',
})
export class ItAddAccountModal {
    
    constructor(
        private popupService: PopupService,
        private store: Store,
        private changeDetectionRef: ChangeDetectorRef
    ) {}

    createAccountFormData: CreateAccountFormData = null as any;

    setCreateAccountFormData(createAccountFormData: CreateAccountFormData) {
        let init = this.createAccountFormData === null;
        this.createAccountFormData = createAccountFormData;
        if (init) this.changeDetectionRef.detectChanges();
    }

    close(succeeded: boolean = false) {
        this.popupService.dismissModal(succeeded);
    }

    signUp() {
        this.store.dispatch(
            new AuthenticationActions.SignUpUser(
                this.createAccountFormData
            )
        )
        .subscribe(() => this.close(true));
    }
}