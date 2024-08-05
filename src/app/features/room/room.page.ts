import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { OptionBottomSheetData, Player, Room } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/popup.service';
import { RoomActions, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { ItOptionBottomSheet } from 'src/app/shared/components/forms/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { TranslateService } from '@ngx-translate/core';
import { ShareBottomSheet } from './menu-bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { RoomUtils } from 'src/app/core/utils/room.utils';
import { RoomSettingsBottomSheet } from './menu-bottom-sheets/room-settings-bottom-sheet/room-settings-bottom-sheet.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html'
})
export class RoomPage extends AngularLifecycle implements OnInit {
  @Select(RoomState.room) room$!: Observable<Room>;

  constructor(
    private store: Store,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const joinInfos =  paramMap.get("connectionData")?.split("-");
        if (joinInfos != null && (joinInfos?.length == 1 || joinInfos?.length == 2)) {
          this.store.dispatch(new RoomActions.JoinRoom(joinInfos[0], joinInfos[1]));
        } else {
          this.navCtrl.navigateBack("home");
        }
      });
  }

  handleMenuAction(actionType: string) {
    switch(actionType) {
      case("exit_to_app"):
        const ref = this.popupService.openBottomSheet(
          ItOptionBottomSheet, 
          {
            data: { 
              title: this.translateService.instant("features.room.leave-bottom-sheet.title"),
              optionOne: this.translateService.instant("actions.cancel"),
              optionTwo: this.translateService.instant("features.room.leave-bottom-sheet.leave-room")
            } as OptionBottomSheetData 
          }
        );
        firstValueFrom(ref.closed)
          .then((data: any) => {
            if (data) {
              this.store.dispatch(new RoomActions.LeaveRoom());
            }
          }
        );
        break;
      case("share"):
        const room = this.store.selectSnapshot(RoomState.room);
        if (!!room) {
          this.popupService.openBottomSheet(
            ShareBottomSheet,
            {
              data: RoomUtils.generateJoinLink(room)
            }
          );
        }
        break;
      case("settings"): {
        this.popupService.openBottomSheet(
          RoomSettingsBottomSheet
        );
      }
    }
  }

  mapPlayersToArray(players: { [key: string]: Player }) {
    return Object.values(players).sort((p1, p2) => p1.joinOrder - p2.joinOrder);
  }

}
