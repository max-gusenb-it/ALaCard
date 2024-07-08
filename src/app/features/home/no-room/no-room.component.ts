import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateRoomModal } from '../create-room-modal/create-room-modal.component';
import { Store } from '@ngxs/store';
import { Room } from 'src/app/core/state';

@Component({
  selector: 'no-room',
  templateUrl: './no-room.component.html'
})
export class NoRoomComponent {

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  async openCreateRoomModal() {
    const modal = await this.modalCtrl.create({
      component: CreateRoomModal
    });
    modal.present();
    modal.onDidDismiss().then(modalResponse => {
      if (modalResponse.data.roomId != null) {
        this.store.dispatch(new Room.JoinRoom(modalResponse.data.roomId));
      }
    });
  }

}
