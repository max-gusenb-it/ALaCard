import { Action, State, StateContext, StateToken } from "@ngxs/store";
import { RoomStateModel } from "./room.model";
import { Injectable } from "@angular/core";
import { Room } from "./room.actions";
import { RoomSourceService } from "../../services/data-source/room-source.service";
import { LoadingHelperService } from "../../services/loading-helper.service";
import { Authentication } from "../authentication";
import { Subscription, firstValueFrom } from "rxjs";
import { Loading, LoadingError } from "../loading";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";

export const ROOM_STATE_TOKEN = new StateToken<RoomStateModel>('room');

@State<RoomStateModel>({
    name: ROOM_STATE_TOKEN
})
@Injectable()
export class RoomState extends AngularLifecycle {
    roomSubscription$: Subscription = null as any;

    constructor(
        private roomSourceService: RoomSourceService,
        private loadingHelperService: LoadingHelperService
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
        let roomObservable = this.roomSourceService.getRoom$(action.roomId);
        // check if room exists
        firstValueFrom(roomObservable)
            .then(
                r => {
                    ctx.dispatch(new Loading.EndLoading);
                    ctx.dispatch(new Room.SetRoom(r));
                },
                e => {
                    if (e instanceof LoadingError) {
                        ctx.dispatch(new Loading.EndLoading(e.exportError()));
                    } else {
                        console.error(e);
                    }
                }
            );
    }

    @Action(Room.SetRoom)
    setRoom(ctx: StateContext<RoomStateModel>, action: Room.SetRoom) {
        const state = ctx.getState();

        ctx.patchState({
            ...state,
            roomId: action.room.id!,
            room: action.room
        });
    }
}