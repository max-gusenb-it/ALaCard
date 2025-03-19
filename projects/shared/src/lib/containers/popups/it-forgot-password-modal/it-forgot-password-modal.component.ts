import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AuthenticationActions, PopUpService } from '@shared';

@Component({
  selector: 'it-forgot-password-modal',
  templateUrl: './it-forgot-password-modal.component.html'
})
export class ItForgotPasswordModal {

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')])
  });

  constructor(
    private popUpService: PopUpService,
    private translateService: TranslateService,
    private store: Store
  ) { }

  close() {
    this.popUpService.dismissModal();
  }

  submit() {
    this.store.dispatch(new AuthenticationActions.ResetPassword(this.forgotPasswordForm.controls['email'].value))
      .subscribe(() => {
        this.popUpService.openSnackbar(
          this.translateService.instant("shared.components.forms.it-forgot-password-modal.mail-sent")
        );
        this.close();
      });
  }

}
