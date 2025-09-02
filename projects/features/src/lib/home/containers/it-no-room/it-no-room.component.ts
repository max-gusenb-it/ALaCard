import { Component } from '@angular/core';
import { ItCreateRoomModal } from '@features';
import { PopUpService } from '@shared';

@Component({
  selector: 'it-no-room',
  templateUrl: './it-no-room.component.html'
})
export class ItNoRoomComponent {

  constructor(
    private popUpService: PopUpService
  ) { }

  openCreateRoomModal() {
    this.popUpService.openModal({
      component: ItCreateRoomModal
    });
  }

}
