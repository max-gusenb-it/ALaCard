import { Component } from '@angular/core';
import { ItCreateRoomModal } from '@features';
import { PopUpService } from '@shared';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'it-no-room',
  templateUrl: './it-no-room.component.html'
})
export class ItNoRoomComponent {

  constructor(
    private navController: NavController,
    private popUpService: PopUpService
  ) { }

  async openCreateRoomModal() {
    const modal = await this.popUpService.openModal({
      component: ItCreateRoomModal
    });
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data?.roomId != null) {
        this.navController.navigateForward(`room/${modalResponse.data.userId}-${modalResponse.data.roomId}`);
      }
    });
  }

}
