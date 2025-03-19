import { ChangeDetectorRef, Component } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationActions, CreateAccountFormData, PopUpService } from "@shared";

@Component({
    selector: 'it-add-account-modal',
    templateUrl: './it-add-account-modal.component.html',
})
export class ItAddAccountModal {
    
    constructor(
        private popUpService: PopUpService,
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
        this.popUpService.dismissModal(succeeded);
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