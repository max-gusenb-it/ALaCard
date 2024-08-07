import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AuthenticationActions } from 'src/app/core/state';
import { ItForgotPasswordModal } from '../it-forgot-password-modal/it-forgot-password-modal.component';

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
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  close(succeeded: boolean = false) {
    this.modalCtrl.dismiss(succeeded);
  }

  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ItForgotPasswordModal
    });
    modal.present();
  }

  signInWithEmail() {
    if (this.loginForm.valid) {
      this.store.dispatch(
        new AuthenticationActions.SignInUser(
          this.loginForm.controls['email'].value,
          this.loginForm.controls['password'].value
        )
      ).subscribe(() => this.close(true));
    }
  }

}
