import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationState } from '@shared';

@Component({
  selector: 'lib-it-join-room-bottom-sheet',
  templateUrl: './it-join-room-bottom-sheet.component.html',
  styleUrl: './it-join-room-bottom-sheet.component.scss',
})
export class ItJoinRoomBottomSheetComponent {

  singleDeviceMode : number | undefined = undefined;

  constructor(public dialogRef: DialogRef, private store: Store) { }

  joinRoom() {
    const userId = this.store.selectSnapshot(AuthenticationState.userId)!;
    const roomId = this.store.selectSnapshot(AuthenticationState.roomId);
    this.dialogRef.close(`/${userId}-${roomId}-${this.singleDeviceMode}`);
  }
}
