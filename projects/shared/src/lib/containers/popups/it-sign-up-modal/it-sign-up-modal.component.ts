import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationActions, CreateAccountFormData, PopupService, ProfileEditorFormData } from '@shared';

@Component({
  selector: 'it-sign-up-modal',
  templateUrl: './it-sign-up-modal.component.html'
})
export class ItSignUpModal {
  stepIndex: number = 0;

  profileFormData: ProfileEditorFormData = null as any;
  createAccountFormData: CreateAccountFormData = null as any;

  constructor(
    private popupService: PopupService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) { }

  close(succeeded: boolean = false) {
    this.popupService.dismissModal(succeeded);
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
        this.store.dispatch(new AuthenticationActions.SignUpUser(this.createAccountFormData, this.profileFormData))
          .subscribe(() => this.close(true));
      }
    }
  }

}
