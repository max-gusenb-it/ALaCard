import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RoomSettings } from 'src/app/core/models/interfaces/logic/room/RoomSettings';
import { RoomSourceService } from 'src/app/core/services/data-source/room-source.service';
import { LoadingHelperService } from 'src/app/core/services/loading-helper.service';
import { RoomState } from 'src/app/core/state';
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
  }

  close() {
    this.dialogRef.close();
  }

  updateSettings() {
    let differences = false;
    const room = this.store.selectSnapshot(RoomState.room);
    differences = room?.settings.singleDeviceMode !== this.roomSettingsForm.controls['singleDeviceMode'].value;
    this.close();
    if (differences) {
      this.loadingHelpService.loadWithLoadingState([
        this.roomSourceService.updateRoom(
          {
            ...room!,
            settings: {
              singleDeviceMode: this.roomSettingsForm.controls['singleDeviceMode'].value
            }
          },
          room!.id!,
          RoomUtils.getRoomCreator(room!).id
        )
      ]).then(() => this.close());
    }
  }

}
