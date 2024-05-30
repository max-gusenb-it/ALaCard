import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { finalize } from 'rxjs';
import { Authentication } from 'src/app/core/state';

@Component({
  selector: 'sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
})
export class SignInModal {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    password: new FormControl({value: "", disabled: false}, [Validators.required]),
  });

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  signInWithEmail() {
    if (this.loginForm.valid) {
      this.store.dispatch(new Authentication.SignInUser(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value))
        .subscribe(() => this.close());
    }
  }

}
