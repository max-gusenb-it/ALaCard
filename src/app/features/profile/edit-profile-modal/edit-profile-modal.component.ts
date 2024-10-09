import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ProfileEditorFormData, User } from 'src/app/core/models/interfaces';
import { UserSourceService } from 'src/app/core/services/source/user.source.service';
import { LoadingHelperService } from 'src/app/core/services/helper/loading.helper.service';
import { PopupService } from 'src/app/core/services/service/popup.service';

@Component({
  selector: 'edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html'
})
export class EditProfileModal implements OnInit {

  user: User | undefined;
  profileFormData: ProfileEditorFormData = {
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

  setProfileFormData(formData: ProfileEditorFormData) {
    this.profileFormData = formData;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  submit() {
    let userCopy: User = {
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
