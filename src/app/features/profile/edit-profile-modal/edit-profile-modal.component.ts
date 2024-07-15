import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { IProfileEditorFormData, IUser } from 'src/app/core/models/interfaces';
import { UserSourceService } from 'src/app/core/services/data-source/user-source.service';
import { PopupService } from 'src/app/core/services/popup.service';
import { LoadingHelperService } from 'src/app/core/services/loading-helper.service';

@Component({
  selector: 'edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModal implements OnInit {

  user: IUser | undefined;
  profileFormData: IProfileEditorFormData = {
    profilePicture: "",
    username: "",
    valid: false
  };

  constructor(
    private modalCtrl: ModalController,
    private loadingHelperService: LoadingHelperService,
    private userSourceService: UserSourceService,
    private popupService: PopupService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.profileFormData.username = this.user!.username;
    this.profileFormData.profilePicture = this.user!.profilePicture;
  }

  setProfileFormData(formData: IProfileEditorFormData) {
    this.profileFormData = formData;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submit() {
    let userCopy: IUser = {
      ...this.user!,
      profilePicture: this.profileFormData.profilePicture,
      username: this.profileFormData.username
    };
    this.loadingHelperService.loadWithLoadingState([
      this.userSourceService.updateUser(userCopy.id!, userCopy)
    ]).then(() => {
      this.close();
      this.popupService.openSnackbar(this.translateService.instant("features.profile.edit-profile-modal.edited-user"))
    })
  }
}
