import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInModal } from '../sign-in-modal/sign-in-modal.component';
import { SignUpModal } from '../sign-up-modal/sign-up-modal.component';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(private modalCtrl: ModalController) { }

  async openSignInModal() {
    const modal = await this.modalCtrl.create({
      component: SignInModal
    });
    modal.present();
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: SignUpModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
    modal.present();
  }

}
