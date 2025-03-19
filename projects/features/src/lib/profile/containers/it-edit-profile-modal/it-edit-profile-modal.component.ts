import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingHelperService, ProfileEditorFormData, User, UserSourceService, PopUpService } from '@shared';

@Component({
  selector: 'it-edit-profile-modal',
  templateUrl: './it-edit-profile-modal.component.html'
})
export class ItEditProfileModal implements OnInit {

  user: User | undefined;
  profileFormData: ProfileEditorFormData = {
    profilePicture: "",
    username: "",
    valid: false
  };

  constructor(
    private loadingHelperService: LoadingHelperService,
    private userSourceService: UserSourceService,
    private popUpService: PopUpService,
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
    this.popUpService.dismissModal();
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
      this.popUpService.openSnackbar(this.translateService.instant("features.profile.edit-profile-modal.edited-user"))
    })
  }
}
