import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Authentication } from 'src/app/core/state';

@Component({
  selector: 'forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html'
})
export class ForgotPasswordModal {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
  });

  constructor(
    private modalCtrl: ModalController,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private store: Store
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  submit() {
    this.store.dispatch(new Authentication.ResetPassword(this.forgotPasswordForm.controls['email'].value))
      .subscribe(() => {
        this.dialogService.openSnackbar(
          this.translateService.instant("features.home.forgot-password-modal.mail-sent")
        );
        this.close();
      });
  }

}
