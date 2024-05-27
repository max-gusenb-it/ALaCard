import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ICreateAccountFormData, IProfileEditorFormData } from 'src/app/core/models/interfaces';

@Component({
  selector: 'sign-up-modal',
  templateUrl: './sign-up-modal.component.html'
})
export class SignUpModal {
  stepIndex: number = 0;

  profileFormData: IProfileEditorFormData = null as any;
  createAccountFormData: ICreateAccountFormData = null as any;

  constructor(private modalCtrl: ModalController, private changeDetectorRef: ChangeDetectorRef) { }

  close() {
    this.modalCtrl.dismiss();
  }

  setProfileFormData(profileFormData: IProfileEditorFormData) {
    let initialSet = !!!this.profileFormData;
    this.profileFormData = profileFormData;
    if (initialSet) this.changeDetectorRef.detectChanges();
  }

  setCreateAccountFormData(createAccountFormData: ICreateAccountFormData) {
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
    }
  }

}
