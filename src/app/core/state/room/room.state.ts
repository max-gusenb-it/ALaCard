import { Action, Selector, State, StateContext, StateToken, Store } from "@ngxs/store";
import { RoomStateModel } from "./room.model";
import { Injectable, NgZone } from "@angular/core";
import { Room } from "./room.actions";
import { RoomSourceService } from "../../services/data-source/room-source.service";
import { LoadingHelperService } from "../../services/loading-helper.service";
import { Authentication, AuthenticationState } from "../authentication";
import { Subscription, firstValueFrom, takeUntil } from "rxjs";
import { Loading } from "../loading";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { ModalController, NavController } from "@ionic/angular";
import { RoomUtils } from "../../utils/room.utils";
import { IRoom } from "../../models/interfaces";
import { SharedErrors, RoomStateErrors } from "../../constants/errorCodes";
import { PopupService } from "../../services/popup.service";
import { TranslateService } from "@ngx-translate/core";
import { UserUtils } from "../../utils/user.utils";
import { ItError } from "../../models/classes";
import { ErrorMonitor } from "../error-monitor";
import { ItAuthenticateDialog } from "src/app/shared/components/forms/it-authenticate-dialog/it-authenticate-dialog.component";

export const ROOM_STATE_TOKEN = new StateToken<RoomStateModel>('room');

@State<RoomStateModel>({
    name: ROOM_STATE_TOKEN
})
@Injectable()
export class RoomState extends AngularLifecycle {
    roomSubscription$: Subscription = null as any;

    @Selector()
    static room(state: RoomStateModel): IRoom | undefined {
        return state.room;
    }

    constructor(
        private navController: NavController,
        private roomSourceService: RoomSourceService,
        private loadingHelperService: LoadingHelperService,
        private translateService: TranslateService,
        private store: Store,
        private zone: NgZone,
        private popupService: PopupService,
        private modalCtrl: ModalController
    ) {
        super();
    }

    @Action(Room.CreateRoom)
    createRoom(ctx: StateContext<RoomStateModel>, action: Room.CreateRoom) {
        return this.loadingHelperService.loadWithLoadingState([
            this.roomSourceService.createRoom(action.name, action.description)
        ]).then(r => {
            return ctx.dispatch(new Authentication.SetUserRoomId(r[0].id!));
        });
    }

    @Action(Room.JoinRoom)
    async joinRoom(ctx: StateContext<RoomStateModel>, action: Room.JoinRoom) {
        if (this.roomSubscription$ != null && !this.roomSubscription$.closed) {
            // ask user if he wants to leave current room
            this.roomSubscription$.unsubscribe();
        }

        // check if user exists
        try {
            let user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user) {
                const modal = await this.modalCtrl.create({
                    component: ItAuthenticateDialog
                });
                modal.present();
                await modal.onDidDismiss();
                user = this.store.selectSnapshot(AuthenticationState.user);
                if (!!!user) throw new ItError(RoomStateErrors.joinRoomNoUser, RoomState.name);
            }

            ctx.dispatch(new Loading.StartLoading);

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

            if (RoomUtils.getRoomCreator(initialRoom).id !== user.id && initialRoom.settings.singleDeviceMode) {
                throw new ItError(RoomStateErrors.joinRoomInOffline, RoomState.name);
            }
            
            let joinOffline = false;
            if (!navigator.onLine && !initialRoom.settings.singleDeviceMode) {
                // If user is offline, ask him if eh wants to join his room in offline mode
                joinOffline = await firstValueFrom(this.popupService.openOptionDialog(
                    this.translateService.instant("features.room.join-room-offline-dialog.title"),
                    this.translateService.instant("actions.cancel"),
                    this.translateService.instant("actions.join"),
                    this.translateService.instant("features.room.join-room-offline-dialog.subtitle")
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
                    ctx.dispatch(new Room.SetRoom(r, action.userId))
            });

            if (joinOffline) {
                // Convert room to offline room
                initialRoom.players = {
                    [user.id!]: UserUtils.exportUserToPlayer(user, 0)
                };
                initialRoom.settings.singleDeviceMode = true;
                this.roomSourceService.updateRoom(
                    initialRoom,
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

            ctx.dispatch(new Loading.EndLoading());
            return Promise.resolve();
        } catch(error) {
            ctx.dispatch(new Loading.EndLoading);
            if (error instanceof ItError) {
                ctx.dispatch(new ErrorMonitor.SetError(error.exportError()));
            } else {
                console.error(error);
                ctx.dispatch(
                    new ErrorMonitor.SetError({
                        code: SharedErrors.unknownError,
                        location: RoomState.name
                    })
                );
            }
            this.navController.navigateBack('home');
            return;
        }
    }

    @Action(Room.SetRoom)
    setRoom(ctx: StateContext<RoomStateModel>, action: Room.SetRoom) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            roomConnectionData: {
                roomId: action.room.id!,
                userId: action.userId
            },
            room: action.room
        });
    }

    @Action(Room.LeaveRoom)
    leaveRoom(ctx: StateContext<RoomStateModel>, action: Room.LeaveRoom) {
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
        // zone wrap to prevent -> Navigation triggered outside Angular zone
        this.zone.run(() => {
            this.navController.navigateBack("home");
        });
        if (!navigator.onLine) ctx.dispatch(new Loading.EndLoading);
        return;
    }
}