import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Room } from 'src/app/core/models/interfaces';
import { RoomSettings } from 'src/app/core/models/interfaces/logic/room/room-settings';
import { RoomSourceService } from 'src/app/core/services/data-source/room-source.service';
import { LoadingHelperService } from 'src/app/core/services/helper/loading.helper.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { RoomUtils } from 'src/app/core/utils/room.utils';

@Component({
  selector: 'app-room-settings-bottom-sheet',
  templateUrl: './room-settings-bottom-sheet.component.html',
  styleUrls: ['./room-settings-bottom-sheet.component.scss'],
})
export class RoomSettingsBottomSheet {
  @Select(RoomState.roomSettings) settings$!: Observable<RoomSettings>;

  roomSettingsForm: FormGroup = new FormGroup({
    singleDeviceMode: new FormControl({value: false, disabled: false}),
    otherAdmin: new FormControl({value: true, disabled: false}),
  });

  constructor(
    private dialogRef: DialogRef,
    private store: Store,
    private roomSourceService: RoomSourceService,
    private loadingHelpService: LoadingHelperService
  ) {
    const settings = this.store.selectSnapshot(RoomState.roomSettings);
    if (!!!settings) this.close();
    this.roomSettingsForm.controls['singleDeviceMode'].setValue(settings?.singleDeviceMode);
    this.roomSettingsForm.controls['otherAdmin'].setValue(settings?.otherAdmin);
  }

  close() {
    this.dialogRef.close();
  }

  updateSettings() {
    let differences = false;
    const room = this.store.selectSnapshot(RoomState.room);
    differences = room?.settings.singleDeviceMode !== this.roomSettingsForm.controls['singleDeviceMode'].value ||
      room?.settings.otherAdmin !== this.roomSettingsForm.controls['otherAdmin'].value;
    this.close();
    if (differences) {
      let newRoom = {...room} as Room;
      if (this.roomSettingsForm.controls['singleDeviceMode'].value && !room?.settings.singleDeviceMode) {
        newRoom = RoomUtils.convertRoomToOfflineMode(newRoom, this.store.selectSnapshot(AuthenticationState.user)!);
      }
      this.loadingHelpService.loadWithLoadingState([
        this.roomSourceService.updateRoom(
          {
            ...newRoom,
            settings: {
              singleDeviceMode: this.roomSettingsForm.controls['singleDeviceMode'].value,
              otherAdmin: this.roomSettingsForm.controls['otherAdmin'].value
            }
          },
          newRoom.id!
        )
      ]).then(() => this.close());
    }
  }

}
