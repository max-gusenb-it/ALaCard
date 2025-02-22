import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CreateRoomModal } from '../create-room-modal/create-room-modal.component';
import { PopupService } from 'projects/shared/src/lib/logic/services/popup.service';

@Component({
  selector: 'no-room',
  templateUrl: './no-room.component.html'
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
