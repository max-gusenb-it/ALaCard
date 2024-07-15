import { Action, Selector, State, StateContext, StateToken, Store } from "@ngxs/store";
import { RoomStateModel } from "./room.model";
import { Injectable, NgZone } from "@angular/core";
import { Room } from "./room.actions";
import { RoomSourceService } from "../../services/data-source/room-source.service";
import { LoadingHelperService } from "../../services/loading-helper.service";
import { Authentication, AuthenticationState } from "../authentication";
import { Subscription, firstValueFrom, takeUntil } from "rxjs";
import { Loading, LoadingError } from "../loading";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { NavController } from "@ionic/angular";
import { RoomUtils } from "../../utils/room.utils";
import { IRoom } from "../../models/interfaces";
import { RoomStateErrors } from "../../constants/errorCodes";
import { PopupService } from "../../services/popup.service";

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
        private store: Store,
        private zone: NgZone,
        private popupService: PopupService
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
    joinRoom(ctx: StateContext<RoomStateModel>, action: Room.JoinRoom) {
        if (this.roomSubscription$ != null && !this.roomSubscription$.closed) {
            // ask user if he wants to leave current room
            this.roomSubscription$.unsubscribe();
        }
        ctx.dispatch(new Loading.StartLoading);

        // check if user exists
        try {
            const user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user) {
                throw new LoadingError(RoomStateErrors.joinRoomNoUser, RoomState.name);
            }

            // check if online
            if (!navigator.onLine) {
                if (action.userId !== undefined && action.userId !== user.id) {
                    throw new LoadingError(RoomStateErrors.joinRoomOffline, RoomState.name);
                }
            }

            let roomObservable = this.roomSourceService.getRoom$(action.roomId, action.userId);
            // check if room exists
            return firstValueFrom(roomObservable)
                .then(
                    r => {
                        return r;
                    },
                    e => {
                        if (e instanceof LoadingError) {
                            ctx.dispatch(new Loading.EndLoading(e.exportError()));
                        } else {
                            ctx.dispatch(new Loading.EndLoading());
                            console.error(e);
                        }
                        this.navController.navigateBack('home');
                        return Promise.reject(e);
                    }
                ).then(r => {
                    // Subscribe to room changes
                    this.roomSubscription$ = roomObservable
                        .pipe(
                            takeUntil(this.destroyed$)
                        )
                        .subscribe(r => {
                            ctx.dispatch(new Room.SetRoom(r, action.userId))
                    });
                    return r;
                }).then(r => {
                    // Add user to room
                    const newPlayer = RoomUtils.generatePlayerForRoom(r, user);
                    if (!!newPlayer) {
                        this.roomSourceService.updatePlayer(
                            r.id!,
                            newPlayer.id,
                            newPlayer,
                            action.userId
                        );
                    }
                    ctx.dispatch(new Loading.EndLoading());
                    return Promise.resolve();
            });
        } catch(error) {
            if (error instanceof LoadingError) {
                ctx.dispatch(new Loading.EndLoading(error.exportError()));
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