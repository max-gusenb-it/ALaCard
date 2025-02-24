import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RoomActions } from '@features';

@Component({
  selector: 'add-offline-player-sheet',
  templateUrl: './it-add-offline-player-bottom-sheet.component.html',
  styleUrls: ['./it-add-offline-player-bottom-sheet.component.scss']
})
export class ItAddOfflinePlayerBottomSheet {

  addOfflinePlayerForm: FormGroup = new FormGroup({
    name: new FormControl({value: "", disabled: false}, [Validators.required]),
  });

  constructor(
    private dialogRef: DialogRef,
    private store: Store
  ) { }

  close() {
    this.dialogRef.close();
  }

  submitPlayer() {
    this.store.dispatch(new RoomActions.AddOfflinePlayer(
      this.addOfflinePlayerForm.controls["name"].value
    ));
    this.addOfflinePlayerForm.controls["name"].setValue("");
  }

}
