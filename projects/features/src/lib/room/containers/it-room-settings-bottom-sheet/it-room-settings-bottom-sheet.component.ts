import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RoomState, RoomSourceService, RoomUtils, Room, RoomSettings } from '@features';
import { AuthenticationState, LoadingHelperService, PopUpService } from '@shared';

@Component({
  selector: 'it-room-settings-bottom-sheet',
  templateUrl: './it-room-settings-bottom-sheet.component.html',
  styleUrls: ['./it-room-settings-bottom-sheet.component.scss'],
})
export class ItRoomSettingsBottomSheet {
  @Select(RoomState.roomSettings) settings$!: Observable<RoomSettings>;

  roomSettingsForm: FormGroup = new FormGroup({
    singleDeviceMode: new FormControl({value: false, disabled: false}),
    otherAdmin: new FormControl({value: true, disabled: false}),
    autoContinueOnAllVotes: new FormControl({value: true, disabled: false})
  });

  constructor(
    private dialogRef: DialogRef,
    private store: Store,
    private popUpService: PopUpService,
    private roomSourceService: RoomSourceService,
    private loadingHelpService: LoadingHelperService,
    private translateService: TranslateService
  ) {
    const settings = this.store.selectSnapshot(RoomState.roomSettings);
    if (!!!settings) this.close();
    this.roomSettingsForm.controls['singleDeviceMode'].setValue(settings?.singleDeviceMode);
    this.roomSettingsForm.controls['otherAdmin'].setValue(settings?.otherAdmin);
    this.roomSettingsForm.controls['autoContinueOnAllVotes'].setValue(settings?.autoContinueOnAllVotes);

    const game = this.store.selectSnapshot(RoomState.game);
    if (!!game) {
      this.roomSettingsForm.controls['singleDeviceMode'].disable();
      this.roomSettingsForm.controls['singleDeviceMode'].updateValueAndValidity();
    }
  }

  close() {
    this.dialogRef.close();
  }

  updateSettings() {
    // ToDo: Move to RoomService
    let differences = false;
    const room = this.store.selectSnapshot(RoomState.room);
    differences = 
      room?.settings.singleDeviceMode !== this.roomSettingsForm.controls['singleDeviceMode'].value ||
      room?.settings.otherAdmin !== this.roomSettingsForm.controls['otherAdmin'].value ||
      room?.settings.autoContinueOnAllVotes !== this.roomSettingsForm.controls['autoContinueOnAllVotes'].value;
    this.close();
    if (differences) {
      let newRoom = {...room} as Room;
      if (room?.settings.singleDeviceMode != this.roomSettingsForm.controls['singleDeviceMode'].value) {
        if (!this.roomSettingsForm.controls['singleDeviceMode'].value && !navigator.onLine) {
          this.popUpService.openSnackbar(this.translateService.instant('features.room.settings-bottom-sheet.only-single-device-when-offline'));
          return;
        }
        newRoom = RoomUtils.removePlayersFromRoom(newRoom, this.store.selectSnapshot(AuthenticationState.user)!);
        newRoom.settings.singleDeviceMode = this.roomSettingsForm.controls['singleDeviceMode'].value;
      }
      this.loadingHelpService.loadWithLoadingState([
        this.roomSourceService.updateRoom(
          {
            ...newRoom,
            settings: {
              singleDeviceMode: this.roomSettingsForm.controls['singleDeviceMode'].value,
              otherAdmin: this.roomSettingsForm.controls['otherAdmin'].value,
              autoContinueOnAllVotes: this.roomSettingsForm.controls['autoContinueOnAllVotes'].value
            }
          },
          newRoom.id!
        )
      ]).then(() => this.close());
    }
  }

}
