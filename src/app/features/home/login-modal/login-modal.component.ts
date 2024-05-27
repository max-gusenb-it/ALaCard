import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
})
export class LoginModal {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl({value: "", disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]),
    password: new FormControl({value: "", disabled: false}, [Validators.required]),
  });

  constructor(private modalCtrl: ModalController) { }

  close() {
    this.modalCtrl.dismiss();
  }

}
