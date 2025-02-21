import { AfterViewInit, Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { EditProfileModal } from './edit-profile-modal/edit-profile-modal.component';
import { FormControl, FormGroup } from '@angular/forms';
import { supportedLanguages } from 'projects/app/src/app/core/constants/languages';
import { supportedColors } from 'projects/shared/src/lib/utils/constants/color';
import { PopupService } from 'projects/shared/src/lib/logic/services/helper/popup.service';
import { DeleteAccountBottomSheetComponent } from './delete-account-bottom-sheet/delete-account-bottom-sheet.component';
import { systemDefaultValue } from 'projects/shared/src/lib/utils/constants/systemDefaultValue';
import { 
  AngularLifecycle,
  ItSignInModal,
  ItAddAccountModal,
  AuthenticationState,
  User,
  LoadingHelperService,
  UserSourceService,
  AuthenticationActions
} from '@shared';

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
    private navCtrl: NavController,
    private loadingHelperService: LoadingHelperService,
    private userSourceService: UserSourceService,
    private popupService: PopupService
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

  editProfile() {
    const user = this.store.selectSnapshot(AuthenticationState.user);

    this.popupService.openModal({
      component: EditProfileModal,
      componentProps: {
        user: user
      }
    });
  }

  getLanguages() {
    return supportedLanguages;
  }

  getColors() {
    return supportedColors;
  }

  getCSSColorClass(color: string, type: 'option' | 'select') : string {
    switch(color) {
      case(systemDefaultValue): {
        return `${color}-${type}-background`;
      }
      default: {
        return `${color}-${type}-background`;
      }
    }
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

  signUp() {
    this.popupService.openModal({
      component: ItAddAccountModal
    });
  }

  signIn() {
    this.popupService.openModal({
      component: ItSignInModal
    });
  }

  deleteAccount() {
    const ref = this.popupService.openBottomSheet(DeleteAccountBottomSheetComponent);
    firstValueFrom(ref.closed).then(del => {
      if (del) {
        this.signOut();
      }
    });
  }

  signOut() {
    this.store.dispatch(new AuthenticationActions.SignOut())
      .subscribe(() => {
        this.navCtrl.navigateBack("/home");
      });
  }

}
