import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { CreateRoomFormData } from 'src/app/core/models/interfaces';
import { RoomActions } from 'src/app/core/state';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html'
})
export class CreateRoomModal {
  
  createRoomFormData: CreateRoomFormData = {
    name: "",
    description: "",
    valid: false
  };

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  setCreateRoomFormData(formData: CreateRoomFormData) {
    this.createRoomFormData = formData;
  }

  createRoom() {
    firstValueFrom(this.store.dispatch(new RoomActions.CreateRoom(
      this.createRoomFormData.name,
      this.createRoomFormData.description
    ))).then(s => {
      this.modalCtrl.dismiss({
        roomId: s.authentication.user.roomId
      });
    })
  }
}
