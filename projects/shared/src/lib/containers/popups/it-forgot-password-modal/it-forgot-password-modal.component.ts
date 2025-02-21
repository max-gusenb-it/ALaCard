import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { PopupService } from 'projects/shared/src/lib/logic/services/helper/popup.service';
import { AuthenticationActions } from '@shared';

@Component({
  selector: 'it-forgot-password-modal',
  templateUrl: './it-forgot-password-modal.component.html'
})
export class ItForgotPasswordModal {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
  });

  constructor(
    private popupService: PopupService,
    private translateService: TranslateService,
    private store: Store
  ) { }

  close() {
    this.popupService.dismissModal();
  }

  submit() {
    this.store.dispatch(new AuthenticationActions.ResetPassword(this.forgotPasswordForm.controls['email'].value))
      .subscribe(() => {
        this.popupService.openSnackbar(
          this.translateService.instant("shared.components.forms.it-forgot-password-modal.mail-sent")
        );
        this.close();
      });
  }

}
