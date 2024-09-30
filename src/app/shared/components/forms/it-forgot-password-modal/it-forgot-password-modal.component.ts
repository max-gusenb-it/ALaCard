import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { AuthenticationActions } from 'src/app/core/state';

@Component({
  selector: 'it-forgot-password-modal',
  templateUrl: './it-forgot-password-modal.component.html'
})
export class ItForgotPasswordModal {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
  });

  constructor(
    private modalCtrl: ModalController,
    private popupService: PopupService,
    private translateService: TranslateService,
    private store: Store
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  submit() {
    this.store.dispatch(new AuthenticationActions.ResetPassword(this.forgotPasswordForm.controls['email'].value))
      .subscribe(() => {
        this.popupService.openSnackbar(
          this.translateService.instant("features.home.forgot-password-modal.mail-sent")
        );
        this.close();
      });
  }

}
