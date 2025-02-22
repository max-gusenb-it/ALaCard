import { ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { PopupService } from "projects/shared/src/lib/logic/services/popup.service";
import { AuthenticationActions, CreateAccountFormData } from "@shared";

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
            new AuthenticationActions.SignUpAnonymousUser(
                this.createAccountFormData.email,
                this.createAccountFormData.password
            )
        )
        .subscribe(() => this.close(true));
    }
}