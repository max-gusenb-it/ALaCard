import { Component } from '@angular/core';
import { CreateRoomModal } from '@features';
import { PopupService } from '@shared';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'it-no-room',
  templateUrl: './it-no-room.component.html'
})
export class NoRoomComponent {

  constructor(
    private navController: NavController,
    private popupService: PopupService
  ) { }

  async openCreateRoomModal() {
    const modal = await this.popupService.openModal({
      component: CreateRoomModal
    });
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data?.roomId != null) {
        this.navController.navigateForward(`room/${modalResponse.data.userId}-${modalResponse.data.roomId}`);
      }
    });
  }

}
