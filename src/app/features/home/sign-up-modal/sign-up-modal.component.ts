import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IProfileEditorData } from 'src/app/core/models/interfaces/components/forms/it-profile-editor/IProfileEditorData';

@Component({
  selector: 'sign-up-modal',
  templateUrl: './sign-up-modal.component.html'
})
export class SignUpModal {
  profileData: IProfileEditorData = null as any;

  constructor(private modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }

  setProfileData(profileData: IProfileEditorData) {
    this.profileData = profileData;
  }

}
