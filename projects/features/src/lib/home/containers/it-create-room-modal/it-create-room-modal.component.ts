import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { CreateRoomFormData, PopUpService } from '@shared';
import { RoomActions } from '@features';

@Component({
  selector: 'it-create-room-modal',
  templateUrl: './it-create-room-modal.component.html'
})
export class ItCreateRoomModal {
  
  createRoomFormData: CreateRoomFormData = {
    name: "",
    valid: false
  };

  constructor(
    private store: Store,
    private popUpService: PopUpService
  ) { }

  close() {
    this.popUpService.dismissModal();
  }

  setCreateRoomFormData(formData: CreateRoomFormData) {
    this.createRoomFormData = formData;
  }

  createRoom() {
    if (!this.createRoomFormData.valid) return;
    firstValueFrom(this.store.dispatch(new RoomActions.CreateRoom(
      this.createRoomFormData.name
    ))).then(state => {
      this.popUpService.dismissModal({
        userId: state?.authentication?.user?.id,
        roomId: state?.authentication?.user?.roomId
      });
    })
  }
}
