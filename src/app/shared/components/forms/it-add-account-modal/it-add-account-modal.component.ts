import { ChangeDetectorRef, Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Store } from "@ngxs/store";
import { CreateAccountFormData } from "src/app/core/models/interfaces";
import { AuthenticationActions } from "src/app/core/state";

@Component({
    selector: 'it-add-account-modal',
    templateUrl: './it-add-account-modal.component.html',
})
export class ItAddAccountModal {
    
    constructor(
        private modalCtrl: ModalController,
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
        this.modalCtrl.dismiss(succeeded);
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