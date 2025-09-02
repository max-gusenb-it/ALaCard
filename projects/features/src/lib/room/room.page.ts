import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { 
  AngularLifecycle,
  LoadingState,
  PopUpService,
  AuthenticationState,
  Utils,
  RoomMode
} from '@shared';
import {
  ItShareBottomSheet,
  ItRoomSettingsBottomSheet,
  ItStartGameModal,
  ItAddOfflinePlayerBottomSheet,
  StaticRoundDataDataService,
  GameService,
  Player,
  Room,
  RoomActions,
  RoomService,
  RoomState,
  RoomUtils,
  StaticRoundData
} from '@features';

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
    private popUpService: PopUpService,
    private translateService: TranslateService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private gameService: GameService,
    private roomService: RoomService
  ) {
    super();

    this.staticRoundData$ = this.staticRoundDataDataService.getStaticRoundData$();
  }

  ngOnInit() {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe(params => {
        const userID = params.get("userID");
        const roomID = params.get("roomID");
        const mode = RoomMode[params.get("mode") as keyof typeof RoomMode] ?? RoomMode.offline;
        if (Utils.isStringDefinedAndNotEmpty(userID) && Utils.isStringDefinedAndNotEmpty(roomID)) {
          this.store.dispatch(new RoomActions.JoinRoom(userID!, roomID!, mode === RoomMode.offline));
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
        const ref = this.popUpService.openOptionBottomSheet(
          this.translateService.instant("features.room.leave-bottom-sheet.title"),
          this.translateService.instant("actions.cancel"),
          this.translateService.instant("features.room.leave-bottom-sheet.leave-room")
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
          this.popUpService.openBottomSheet(
            ItShareBottomSheet,
            {
              data: RoomUtils.generateJoinLink(room)
            }
          );
        }
        break;
      case(settingsMenuItem): {
          this.popUpService.openBottomSheet(ItRoomSettingsBottomSheet);
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
    this.popUpService.openBottomSheet(
      ItAddOfflinePlayerBottomSheet
    )
  }

  mapPlayersToArray(players: { [key: string]: Player }) {
    return RoomUtils.mapPlayersToArray(players);
  }

  getAdminResponseCountInfo() {
    return this.gameService.getAdminResponseCountInfo(-1);
  }

  startGame() {
    this.popUpService.openModal({
      component: ItStartGameModal
    });
  }

  continueToGame() {
    this.gameService.continueToGame();
  }

  endGame() {
    this.store.dispatch(new RoomActions.SetGame(null as any));
  }

}
