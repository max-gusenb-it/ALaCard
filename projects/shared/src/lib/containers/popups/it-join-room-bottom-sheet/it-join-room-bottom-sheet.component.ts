import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthenticationState, InformationActions, InformationState } from '@shared';

@Component({
  selector: 'lib-it-join-room-bottom-sheet',
  templateUrl: './it-join-room-bottom-sheet.component.html',
  styleUrl: './it-join-room-bottom-sheet.component.scss',
})
export class ItJoinRoomBottomSheetComponent {

  singleDeviceMode : number | undefined = undefined;

  constructor(public dialogRef: DialogRef, private store: Store) {
    this.singleDeviceMode = this.store.selectSnapshot(InformationState.joinedInSingleDeviceMode) ? 1 : 0;
  }

  singleDeviceModeSelectionChanged(singleDeviceMode: number) {
    this.singleDeviceMode = singleDeviceMode;
    this.store.dispatch(new InformationActions.SetJoinedInSingleDeviceMode(singleDeviceMode === 1));
  }

  joinRoom() {
    const userID = this.store.selectSnapshot(AuthenticationState.userId)!;
    const roomID = this.store.selectSnapshot(AuthenticationState.roomId);
    this.dialogRef.close({
      userID: userID,
      roomID: roomID,
      mode: this.singleDeviceMode
    });
  }
}
