import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { OptionBottomSheetData, Player, Room, StaticRoundData } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { AuthenticationState, LoadingState, RoomActions, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { ItOptionBottomSheet } from 'src/app/shared/components/forms/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { TranslateService } from '@ngx-translate/core';
import { ShareBottomSheet } from './bottom-sheets/share-bottom-sheet/share-bottom-sheet.component';
import { RoomUtils } from 'src/app/core/utils/room.utils';
import { RoomSettingsBottomSheet } from './bottom-sheets/room-settings-bottom-sheet/room-settings-bottom-sheet.component';
import { StartGameModal } from './start-game-modal/start-game-modal.component';
import { ResponseDataDataService } from 'src/app/core/services/data/response-data.data.service';
import { AddOfflinePlayerBottomSheet } from './bottom-sheets/add-offline-player-bottom-sheet/add-offline-player-bottom-sheet.component';
import { StaticRoundDataDataService } from 'src/app/core/services/data/static-round-data.data.service';

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
    private responseDataDataService: ResponseDataDataService,
    private modalCtrl: ModalController
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
    return this.store.selectSnapshot(AuthenticationState.user)?.id === RoomUtils.getRoomCreator(this.store.selectSnapshot(RoomState.room)!).id;
  }

  isUserRoomAdmin() {
    return RoomUtils.isUserAdmin(this.store);
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

  addOfflinePlayer() {
    this.popupService.openBottomSheet(
      AddOfflinePlayerBottomSheet
    )
  }

  mapPlayersToArray(players: { [key: string]: Player }) {
    return RoomUtils.mapPlayersToArray(players);
  }

  getAdminResponseCountInfo() {
    return this.responseDataDataService.getAdminResponseCountInfo(this.staticRoundDataDataService.getStaticRoundData()!.round!.id);
  }

  getRuleReadCount() {
    return this.responseDataDataService.getAdminResponsesForRound(-1).length;
  }

  async startGame() {
    const modal = await this.modalCtrl.create({
      component: StartGameModal
    });
    modal.present();
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
