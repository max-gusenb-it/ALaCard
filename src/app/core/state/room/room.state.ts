import { Action, Selector, State, StateContext, StateToken, Store } from "@ngxs/store";
import { RoomStateModel } from "./room.model";
import { Injectable, NgZone } from "@angular/core";
import { RoomActions } from "./room.actions";
import { RoomSourceService } from "../../services/data-source/room-source.service";
import { LoadingHelperService } from "../../services/loading-helper.service";
import { AuthenticationActions, AuthenticationState } from "../authentication";
import { Subscription, firstValueFrom, takeUntil } from "rxjs";
import { LoadingActions } from "../loading";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { ModalController, NavController } from "@ionic/angular";
import { RoomUtils } from "../../utils/room.utils";
import { Room } from "../../models/interfaces";
import { SharedErrors, RoomStateErrors } from "../../constants/errorCodes";
import { PopupService } from "../../services/popup.service";
import { TranslateService } from "@ngx-translate/core";
import { ItError } from "../../models/classes";
import { ErrorMonitorActions } from "../error-monitor";
import { ItAuthenticateModal } from "src/app/shared/components/forms/it-authenticate-modal/it-authenticate-modal.component";
import { RoomSettings } from "../../models/interfaces/logic/room/RoomSettings";
import { IngameDataSourceService } from "../../services/data-source/ingame-data-source.service";
import { ResponseDataSourceServicee } from "../../services/data-source/response-source.service";

export const ROOM_STATE_TOKEN = new StateToken<RoomStateModel>('room');

@State<RoomStateModel>({
    name: ROOM_STATE_TOKEN
})
@Injectable()
export class RoomState extends AngularLifecycle {
    roomSubscription$: Subscription = null as any;

    @Selector()
    static room(state: RoomStateModel): Room | undefined {
        return state.room;
    }

    @Selector()
    static roomSettings(state: RoomStateModel): RoomSettings | undefined {
        return state.room?.settings;
    }

    constructor(
        private navController: NavController,
        private roomSourceService: RoomSourceService,
        private ingameDataSourceService: IngameDataSourceService,
        private responseDataSourceService: ResponseDataSourceServicee,
        private loadingHelperService: LoadingHelperService,
        private translateService: TranslateService,
        private store: Store,
        private zone: NgZone,
        private popupService: PopupService,
        private modalCtrl: ModalController,
    ) {
        super();
    }

    @Action(RoomActions.CreateRoom)
    createRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.CreateRoom) {
        return this.loadingHelperService.loadWithLoadingState([
            this.roomSourceService.createRoom(action.name, action.description)
        ]).then(r => {
            return ctx.dispatch(new AuthenticationActions.SetUserRoomId(r[0].id!));
        });
    }

    @Action(RoomActions.JoinRoom)
    async joinRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.JoinRoom) {
        if (this.roomSubscription$ != null && !this.roomSubscription$.closed) {
            // ask user if he wants to leave current room
            this.roomSubscription$.unsubscribe();
        }

        // check if user exists
        try {
            let user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user) {
                const modal = await this.modalCtrl.create({
                    component: ItAuthenticateModal
                });
                modal.present();
                await modal.onDidDismiss();
                user = this.store.selectSnapshot(AuthenticationState.user);
                if (!!!user) throw new ItError(RoomStateErrors.joinRoomNoUser, RoomState.name);
            }

            ctx.dispatch(new LoadingActions.StartLoading);

            // If user is not online he can only join his own room 
            if (!navigator.onLine) {
                if (action.userId !== undefined && action.userId !== user.id) {
                    throw new ItError(RoomStateErrors.joinRoomOffline, RoomState.name);
                }
            }

            let roomObservable = this.roomSourceService.getRoom$(action.roomId, action.userId);

            // check if room exists
            let initialRoom = await firstValueFrom(roomObservable)
                .then(
                    r => {
                        return r;
                    },
                    e => {
                        throw e;
                }
            );

            // ToDo: fix singleDeviceMode chache problem -> memo
            if (RoomUtils.getRoomCreator(initialRoom).id !== user.id && initialRoom.settings.singleDeviceMode) {
                throw new ItError(RoomStateErrors.joinRoomInOffline, RoomState.name);
            }
            
            let joinOffline = false;
            if (!navigator.onLine && !initialRoom.settings.singleDeviceMode) {
                // If user is offline, ask him if eh wants to join his room in offline mode
                joinOffline = await firstValueFrom(this.popupService.openOptionBottomSheet(
                    this.translateService.instant("features.room.join-room-offline-bottom-sheet.title"),
                    this.translateService.instant("actions.cancel"),
                    this.translateService.instant("actions.join"),
                    this.translateService.instant("features.room.join-room-offline-bottom-sheet.subtitle")
                ).closed) as boolean;
                if (!joinOffline) {
                    throw new Error();
                }
            }

            this.roomSubscription$ = roomObservable
                .pipe(
                    takeUntil(this.destroyed$)
                )
                .subscribe(r => {
                    ctx.dispatch(new RoomActions.SetRoom(r, action.userId))
            });

            if (joinOffline) {
                // Convert room to offline room
                this.roomSourceService.updateRoom(
                    RoomUtils.convertRoomToOfflineMode(initialRoom, user),
                    initialRoom.id!
                );
            } else {
                // Add user to room
                const newPlayer = RoomUtils.generatePlayerForRoom(initialRoom, user);
                if (!!newPlayer) {
                    this.roomSourceService.updatePlayer(
                        initialRoom.id!,
                        newPlayer.id,
                        newPlayer,
                        action.userId
                    );
                }
            }

            ctx.dispatch(new LoadingActions.EndLoading());
            return Promise.resolve();
        } catch(error) {
            ctx.dispatch(new LoadingActions.EndLoading);
            if (error instanceof ItError) {
                ctx.dispatch(new ErrorMonitorActions.SetError(error.exportError()));
            } else {
                console.error(error);
                ctx.dispatch(
                    new ErrorMonitorActions.SetError({
                        code: SharedErrors.unknownError,
                        location: RoomState.name
                    })
                );
            }
            this.navController.navigateBack('home');
            return;
        }
    }

    @Action(RoomActions.SetRoom)
    setRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.SetRoom) {
        try {
            const user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user || !!!action.room.players[user.id!]) {
                // ToDo: User was removed from in this case but why? -> throw meaningfull error message
                throw new ItError(RoomStateErrors.joinRoomInOffline, RoomState.name);
            }
    
            const state = ctx.getState();
    
            ctx.patchState({
                ...state,
                roomConnectionData: {
                    roomId: action.room.id!,
                    userId: action.userId
                },
                room: action.room
            });
        } catch (error) {
            if (!!this.roomSubscription$ && !this.roomSubscription$.closed) this.roomSubscription$.unsubscribe();
            if (error instanceof ItError) {
                ctx.dispatch(new ErrorMonitorActions.SetError(error.exportError()));
            } else {
                console.error(error);
                ctx.dispatch(
                    new ErrorMonitorActions.SetError({
                        code: SharedErrors.unknownError,
                        location: RoomState.name
                    })
                );
            }
            this.navController.navigateBack('home');
            return;
        }
    }

    @Action(RoomActions.LeaveRoom)
    leaveRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.LeaveRoom) {
        if (this.roomSubscription$ == null || this.roomSubscription$.closed) {
            this.navController.navigateBack("home");
            return Promise.resolve();
        }

        const userId = this.store.selectSnapshot(AuthenticationState.user)?.id!;
        const player = RoomUtils.generateLeftPlayer(ctx.getState().room, userId);
        if (!!!player) {
            return;
        }

        const state = ctx.getState();
        
        this.loadingHelperService.loadWithLoadingState([this.roomSourceService.updatePlayer(state.roomConnectionData.roomId, userId, player, state.roomConnectionData.userId)]);
        this.roomSubscription$.unsubscribe();
        // zone wrap to prevent -> "Navigation triggered outside Angular zone"
        this.zone.run(() => {
            this.navController.navigateBack("home");
        });
        if (!navigator.onLine) ctx.dispatch(new LoadingActions.EndLoading);
        return;
    }

    @Action(RoomActions.StartGame)
    startGame(ctx: StateContext<RoomStateModel>, action: RoomActions.StartGame) {
        const state = ctx.getState();

        if (!!!state.room) return;
        
        return this.loadingHelperService.loadWithLoadingState([
            this.roomSourceService.updateRoom(
                {
                    ...state.room,
                    game: {
                        deck: action.deck,
                        settings: {}
                    }
                },
                state.room.id!,
            ),
            this.ingameDataSourceService.createInitialIngameData(state.room.id!),
            this.responseDataSourceService.createInitialResponseData(state.room.id!),
            // ToDo: Add round start notifier doc
        ]);
    }
}