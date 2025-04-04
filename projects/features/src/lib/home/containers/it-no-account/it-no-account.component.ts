import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ItCreateRoomAsGuestModal } from "@features";
import {
  ItSignInModal,
  ItSignUpModal,
  PopUpService
} from '@shared';

@Component({
  selector: 'it-no-account',
  templateUrl: './it-no-account.component.html'
})
export class ItNoAccountComponent {

  constructor(
    private navController: NavController,
    private popUpService: PopUpService
  ) { }

  openSignInModal() {
    this.popUpService.openModal({
      component: ItSignInModal
    });
  }

  openSignUpModal() {
    this.popUpService.openModal({
      component: ItSignUpModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
  }

  async openCreateRoomAsGuestModal() {
    const modal = await this.popUpService.openModal({
      component: ItCreateRoomAsGuestModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data?.roomId != null) {
        this.navController.navigateForward(`room/${modalResponse.data.userId}-${modalResponse.data.roomId}`);
      }
    });
  }

}
