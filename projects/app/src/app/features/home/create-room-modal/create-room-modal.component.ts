import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { PopupService } from 'projects/shared/src/lib/logic/services/helper/popup.service';
import { RoomActions } from 'projects/app/src/app/core/state';
import { CreateRoomFormData } from '@shared';

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
    private store: Store,
    private popupService: PopupService
  ) { }

  close() {
    this.popupService.dismissModal();
  }

  setCreateRoomFormData(formData: CreateRoomFormData) {
    this.createRoomFormData = formData;
  }

  createRoom() {
    if (!this.createRoomFormData.valid) return;
    firstValueFrom(this.store.dispatch(new RoomActions.CreateRoom(
      this.createRoomFormData.name,
      this.createRoomFormData.description
    ))).then(state => {
      this.popupService.dismissModal({
        userId: state?.authentication?.user?.id,
        roomId: state?.authentication?.user?.roomId
      });
    })
  }
}
