import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItSignInModal } from 'src/app/shared/components/forms/it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from 'src/app/shared/components/forms/it-sign-up-modal/it-sign-up-modal.component';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(private modalCtrl: ModalController) { }

  async openSignInModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignInModal
    });
    modal.present();
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignUpModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
    modal.present();
  }

}
