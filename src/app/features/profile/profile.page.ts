import { AfterViewInit, Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/interfaces/logic/user/User';
import { AuthenticationActions, AuthenticationState } from 'src/app/core/state';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { supportedLanguages } from 'src/app/core/constants/languages';
import { LoadingHelperService } from 'src/app/core/services/loading-helper.service';
import { UserSourceService } from 'src/app/core/services/data-source/user-source.service';
import { supportedColors } from 'src/app/core/constants/color';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { ItSignInModal } from 'src/app/shared/components/forms/it-sign-in-modal/it-sign-in-modal.component';
import { ItAddAccountModal } from 'src/app/shared/components/forms/it-add-account-modal/it-add-account-modal.component';
import { PopupService } from 'src/app/core/services/popup.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'profile',
  templateUrl: './profile.page.html'
})
export class ProfilePage extends AngularLifecycle implements AfterViewInit {
  @Select(AuthenticationState.user) user$!: Observable<User>;
  @Select(AuthenticationState.isAnonymous) isAnonymous$!: Observable<boolean>;

  settingsForm: FormGroup = new FormGroup({
    language: new FormControl({value: "", disabled: false}),
    color: new FormControl({value: "", disabled: false}),
  });

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loadingHelperService: LoadingHelperService,
    private userSourceService: UserSourceService,
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngAfterViewInit() {
    // Code in afterViewInit so markAsPristine works when not starting at profile page
    this.user$
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(u => {
        if (!!u) {
          this.settingsForm.controls['language'].setValue(u.settings.language);
          this.settingsForm.controls['color'].setValue(u.settings.color);
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
    return supportedLanguages;
  }

  getColors() {
    return supportedColors;
  }

  updateSettings() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    this.loadingHelperService.loadWithLoadingState([
      this.userSourceService.updateUser(
        user!.id!,
        {
          ...user!,
          settings: {
            language: this.settingsForm.controls['language'].value,
            color: this.settingsForm.controls['color'].value
          }
        })
    ]);
  }

  async signUp() {
    const modal = await this.modalCtrl.create({
      component: ItAddAccountModal
    });
    modal.present();
  }

  async signIn() {
    const modal = await this.modalCtrl.create({
      component: ItSignInModal
    });
    modal.present();
  }

  deleteAccount() {
    this.popupService.openOptionBottomSheet(
      this.translateService.instant("features.profile.want-to-delete-account"),
      this.translateService.instant("actions.cancel"),
      this.translateService.instant("actions.submit")
    )
  }

  signOut() {
    this.store.dispatch(new AuthenticationActions.SignOut())
      .subscribe(() => {
        this.navCtrl.navigateBack("/home");
      });
  }

}
