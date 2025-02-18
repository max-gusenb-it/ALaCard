import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PopupService } from 'projects/app/src/app/core/services/service/popup.service';
import { ItCreateRoomAsGuestModal } from '@shared';
import { ItSignInModal } from '@shared';
import { ItSignUpModal } from '@shared';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(
    private navController: NavController,
    private popupService: PopupService
  ) { }

  openSignInModal() {
    this.popupService.openModal({
      component: ItSignInModal
    });
  }

  openSignUpModal() {
    this.popupService.openModal({
      component: ItSignUpModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
  }

  async openCreateRoomAsGuestModal() {
    const modal = await this.popupService.openModal({
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
