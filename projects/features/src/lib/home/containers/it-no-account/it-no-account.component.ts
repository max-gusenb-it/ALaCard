import { Component } from '@angular/core';
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
    this.popUpService.openModal({
      component: ItCreateRoomAsGuestModal,
      id: "drawing-board-parent",
      cssClass: "sign-up-modal"
    });
  }

}
