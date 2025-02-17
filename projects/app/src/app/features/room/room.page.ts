import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { OptionBottomSheetData, Player, Room, StaticRoundData } from 'projects/app/src/app/core/models/interfaces';
import { PopupService } from 'projects/app/src/app/core/services/service/popup.service';
import { AuthenticationState, LoadingState, RoomActions, RoomState } from 'projects/app/src/app/core/state';
import { AngularLifecycle } from '@shared';
import { ItOptionBottomSheet } from 'projects/app/src/app/shared/components/forms/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { TranslateService } from '@ngx-translate/core';
import { ShareBottomSheet } from './bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { RoomUtils } from 'projects/app/src/app/core/utils/room.utils';
import { RoomSettingsBottomSheet } from './bottom-sheets/room-settings-bottom-sheet/room-settings-bottom-sheet.component';
import { StartGameModal } from './start-game-modal/start-game-modal.component';
import { AddOfflinePlayerBottomSheet } from './bottom-sheets/add-offline-player-bottom-sheet/add-offline-player-bottom-sheet.component';
import { StaticRoundDataDataService } from 'projects/app/src/app/core/services/data/static-round-data.data.service';
import { RoomService } from 'projects/app/src/app/core/services/service/room.service';
import { GameControlService } from 'projects/app/src/app/core/services/service/game-control.service';

const leaveRoomMenuItem = 'exit_to_app';
const shareMenuItem = 'share';
const settingsMenuItem = 'settings';
const endGameMenuItem = 'stop';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html'
})
export class RoomPage extends AngularLifecycle implements OnInit {
  @Select(RoomState.room) room$: Observable<Room>;

  @Select(RoomState.gameStarted) gameStarted$: Observable<boolean>;

  @Select(LoadingState.isLoading) isLoading$: Observable<boolean>;

  staticRoundData$: Observable<StaticRoundData>;

  constructor(
    private store: Store,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private translateService: TranslateService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private gameControlService: GameControlService,
    private roomService: RoomService
  ) {
    super();

    this.staticRoundData$ = this.staticRoundDataDataService.getStaticRoundData$();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const joinInfos =  paramMap.get("connectionData")?.split("-");
        if (joinInfos != null && joinInfos.length == 2) {
          this.store.dispatch(new RoomActions.JoinRoom(joinInfos[0], joinInfos[1]));
        } else {
          this.navCtrl.navigateBack("home");
        }
      });
  }

  isUserRoomCreator() {
    return this.store.selectSnapshot(AuthenticationState.userId) === RoomUtils.getRoomCreator(this.store.selectSnapshot(RoomState.room)!).id;
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  getMenuItems() {
    let menuItems = [leaveRoomMenuItem, shareMenuItem];
    if (this.isUserRoomAdmin()) {
      menuItems = [...menuItems, settingsMenuItem]; // ToDo: add 'help', 'report_problem' to button
      
      if (!!this.store.selectSnapshot(RoomState.room)?.game) {
        menuItems = [endGameMenuItem, ...menuItems];
      }
    }
    return menuItems;
  }

  handleMenuAction(actionType: string) {
    switch(actionType) {
      case(leaveRoomMenuItem):
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
      case(shareMenuItem):
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
      case(settingsMenuItem): {
          this.popupService.openBottomSheet(RoomSettingsBottomSheet);
        }
        break;
      case(endGameMenuItem): {
          this.endGame();
        }
        break;
    }
  }

  kickPlayer(playerId: string) {
    this.roomService.kickPlayerFromRoom(playerId);
  }

  addOfflinePlayer() {
    this.popupService.openBottomSheet(
      AddOfflinePlayerBottomSheet
    )
  }

  mapPlayersToArray(players: { [key: string]: Player }) {
    return RoomUtils.mapPlayersToArray(players);
  }

  getAdminResponseCountInfo() {
    return this.gameControlService.getAdminResponseCountInfo(-1);
  }

  startGame() {
    this.popupService.openModal({
      component: StartGameModal
    });
  }

  continueToGame() {
    const staticRoundData = this.staticRoundDataDataService.getStaticRoundData();
    if (!!!staticRoundData) return;
    this.store.dispatch(new RoomActions.ContinueToGame(staticRoundData))
  }

  endGame() {
    this.store.dispatch(new RoomActions.EndGame());
  }

}
