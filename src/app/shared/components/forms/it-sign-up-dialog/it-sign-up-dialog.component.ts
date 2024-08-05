import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CreateAccountFormData, ProfileEditorFormData } from 'src/app/core/models/interfaces';
import { AuthenticationActions } from 'src/app/core/state';

@Component({
  selector: 'it-sign-up-dialog',
  templateUrl: './it-sign-up-dialog.component.html'
})
export class ItSignUpDialog {
  stepIndex: number = 0;

  profileFormData: ProfileEditorFormData = null as any;
  createAccountFormData: CreateAccountFormData = null as any;

  constructor(
    private modalCtrl: ModalController,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) { }

  close(succeeded: boolean = false) {
    this.modalCtrl.dismiss(succeeded);
  }

  setProfileFormData(profileFormData: ProfileEditorFormData) {
    let initialSet = !!!this.profileFormData;
    this.profileFormData = profileFormData;
    if (initialSet) this.changeDetectorRef.detectChanges();
  }

  setCreateAccountFormData(createAccountFormData: CreateAccountFormData) {
    this.createAccountFormData = createAccountFormData;
  }

  formInvalid() {
    switch(this.stepIndex) {
      case 0: {
        return !!!this.profileFormData || !this.profileFormData.valid;
      };
      case 1: {
        return !!!this.createAccountFormData || (!this.createAccountFormData.valid && this.createAccountFormData.register);
      }
    }
    return false;
  }

  goBack() {
    this.stepIndex -= 1;
    this.changeDetectorRef.detectChanges();
  }

  goForward() {
    switch(this.stepIndex) {
      case 0: {
        this.stepIndex += 1;
        this.changeDetectorRef.detectChanges();
      } break;
      case 1: {
        this.store.dispatch(new AuthenticationActions.SignUpUser(this.profileFormData, this.createAccountFormData))
          .subscribe(() => this.close(true));
      }
    }
  }

}
