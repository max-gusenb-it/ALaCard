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
        private zone: NgZone
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
        try {
            let roomObservable = this.roomSourceService.getRoom$(action.roomId, action.userId);
            // check if room exists
            firstValueFrom(roomObservable)
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
                    // Add user to room
                    const newPlayer = RoomUtils.generatePlayerForRoom(r, this.store.selectSnapshot(AuthenticationState.user)!);
                    if (!!newPlayer) {
                        return this.roomSourceService.updatePlayer(
                            r.id!,
                            newPlayer.id,
                            newPlayer,
                            action.userId
                        );
                    } else {
                        return Promise.resolve();
                    }
                }).then(() => {
                    // Subscribe to room changes
                    this.roomSubscription$ = roomObservable
                        .pipe(
                            takeUntil(this.destroyed$)
                        )
                        .subscribe(r => {
                            ctx.dispatch(new Room.SetRoom(r, action.userId))
                    });
                    ctx.dispatch(new Loading.EndLoading());
            });
        } catch(error) {
            console.log (error);
            // ToDo: Fix join room without user
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
            return Promise.reject();
        }
        
        return this.loadingHelperService.loadWithLoadingState([this.roomSourceService.updatePlayer(ctx.getState().room.id!, userId, player)])
            .then(() => {
                this.roomSubscription$.unsubscribe();
                // zone wrap to prevent -> Navigation triggered outside Angular zone
                this.zone.run(() => {
                    this.navController.navigateBack("home");
                });
        });
    }
}