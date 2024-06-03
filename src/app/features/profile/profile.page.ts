import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/core/models/interfaces/logic/user/IUser';
import { Authentication, AuthenticationState } from 'src/app/core/state';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { supportedLanguages, systemDefaultLanguage } from 'src/app/core/constants/languages';
import { LoadingHelperService } from 'src/app/core/services/loading-helper.service';
import { UserSourceService } from 'src/app/core/services/data-source/user-source.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html'
})
export class ProfilePage {
  @Select(AuthenticationState.user) user$!: Observable<IUser>;

  settingsForm: FormGroup = new FormGroup({
    language: new FormControl({value: "", disabled: false}),
  });

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingHelperService: LoadingHelperService,
    private userSourceService: UserSourceService,
  ) {
    this.user$
      .subscribe(u => {
        if (!!u) {
          this.settingsForm.controls['language'].setValue(u.settings.language);
          // makes form 'not dirty' again so we can check, if the user changed something
          this.settingsForm.markAsPristine();
        }
    });
  }

  async editProfile() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    const modal = await this.modalCtrl.create({
      component: EditProfileModal,
      componentProps: {
        user: user
      }
    });
    modal.present();
  }

  getLanguages() {
    return [
      systemDefaultLanguage,
      ...supportedLanguages
    ]
  }

  updateSettings() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    this.loadingHelperService.loadWithLoadingState([
      this.userSourceService.updateUser(
        user!.id!,
        {
          ...user!,
          settings: {
            language: this.settingsForm.controls['language'].value
          }
        })
    ]);
  }

  signOut() {
    this.store.dispatch(new Authentication.SignOut())
      .subscribe(() => {
        this.navCtrl.navigateBack("/home");
      });
  }

}
