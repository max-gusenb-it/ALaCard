import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ItCreateRoomAsGuestModal } from 'src/app/shared/components/forms/it-create-room-as-guest-modal/it-create-room-as-guest-modal.component';
import { ItSignInModal } from 'src/app/shared/components/forms/it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from 'src/app/shared/components/forms/it-sign-up-modal/it-sign-up-modal.component';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(
    private modalCtrl: ModalController,
    private navController: NavController
  ) { }

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

  async openCreateRoomAsGuestModal() {
    const modal = await this.modalCtrl.create({
      component: ItCreateRoomAsGuestModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
    modal.present();
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data.roomId != null) {
        this.navController.navigateForward(`room/${modalResponse.data.userId}-${modalResponse.data.roomId}`);
      }
    });
  }

}
