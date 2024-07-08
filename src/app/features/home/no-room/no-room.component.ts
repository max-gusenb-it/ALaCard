import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CreateRoomModal } from '../create-room-modal/create-room-modal.component';

@Component({
  selector: 'no-room',
  templateUrl: './no-room.component.html'
})
export class NoRoomComponent {

  constructor(
    private modalCtrl: ModalController,
    private navController: NavController
  ) { }

  async openCreateRoomModal() {
    const modal = await this.modalCtrl.create({
      component: CreateRoomModal
    });
    modal.present();
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data.roomId != null) {
        this.navController.navigateForward(`room/${modalResponse.data.roomId}`);
      }
    });
  }

}
