import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AuthenticationActions, PopUpService, ItForgotPasswordModal, Utils } from '@shared';

@Component({
  selector: 'it-sign-in-modal',
  templateUrl: './it-sign-in-modal.component.html',
})
export class ItSignInModal {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    password: new FormControl({value: "", disabled: false}, [Validators.required]),
  });

  constructor(
    private popUpService: PopUpService,
    private store: Store
  ) { }

  close(succeeded: boolean = false) {
    this.popUpService.dismissModal(succeeded);
  }

  async forgotPassword() {
    const modal = await this.popUpService.openModal({
      component: ItForgotPasswordModal,
      componentProps: {
        email: this.loginForm.controls["email"].value
      }
    });
    modal.onDidDismiss().then(forgotPasswortDetail => {
      if (Utils.isStringDefinedAndNotEmpty(forgotPasswortDetail.data.email))
        this.loginForm.controls["email"].setValue(forgotPasswortDetail.data.email);
    });
  }

  signInWithEmail() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        new AuthenticationActions.SignInUser(
          this.loginForm.controls["email"].value,
          this.loginForm.controls["password"].value
        )
      ).subscribe(() => this.close(true));
    }
  }

}
