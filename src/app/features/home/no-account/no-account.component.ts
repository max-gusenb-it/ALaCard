import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItSignInDialog } from 'src/app/shared/components/forms/it-sign-in-dialog/it-sign-in-dialog.component';
import { ItSignUpDialog } from 'src/app/shared/components/forms/sign-up-dialog/it-sign-up-dialog.component';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(private modalCtrl: ModalController) { }

  async openSignInModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignInDialog
    });
    modal.present();
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignUpDialog,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
    modal.present();
  }

}
