import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { Room } from 'src/app/core/state';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html'
})
export class CreateRoomModal {

  roomForm: FormGroup = new FormGroup({
    name: new FormControl({value: "", disabled: false}, [Validators.required, Validators.maxLength(30)]),
    description: new FormControl({value: "", disabled: false}, [Validators.required, Validators.maxLength(60)]),
  });

  constructor(
    private modalCtrl: ModalController,
    private store: Store
  ) { }

  close() {
    this.modalCtrl.dismiss();
  }

  createRoom() {
    firstValueFrom(this.store.dispatch(new Room.CreateRoom(
      this.roomForm.controls["name"].value,
      this.roomForm.controls["description"].value
    ))).then(s => {
      this.modalCtrl.dismiss({
        roomId: s.authentication.user.roomId
      });
    })
  }
}
