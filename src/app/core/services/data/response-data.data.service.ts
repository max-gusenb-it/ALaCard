import { BehaviorSubject, map, Observable, Subscription, takeUntil } from "rxjs";
import { Response, ResponseData, Room } from "../../models/interfaces";
import { ResponseDataSourceService } from "../source/response-data.source.service";
import { Select, Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { Injectable } from "@angular/core";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { GameState } from "../../models/enums";
import { RoomUtils } from "../../utils/room.utils";
import { InformationState } from "../../state/information";

@Injectable({
    providedIn: 'root'
})
export class ResponseDataService extends AngularLifecycle {
    responseDataSubscription$: Subscription = null as any;
    responseData$: BehaviorSubject<ResponseData> = new BehaviorSubject(null as any);

    @Select(RoomState.room) room$!: Observable<Room>;
    room: Room;

    constructor(
        private store: Store,
        private responseDataSourceService: ResponseDataSourceService
    ) {
        super();

        this.room$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(room => {
                const userId = this.store.selectSnapshot(AuthenticationState.userid);
                if (!!!room || !!!room.game || room.game.state === GameState.ended || RoomUtils.getRoomAdmin(room).id !== userId) {
                    if (!!this.responseDataSubscription$ && !this.responseDataSubscription$.closed) {
                        this.disconnectFromResponseData();
                    };
                } else if (!!userId && !!room.game && room.game.state === GameState.started && RoomUtils.getRoomAdmin(room).id === userId && (!!!this.responseDataSubscription$ || this.responseDataSubscription$.closed)) {
                    this.connectToResponseData(room.id!);
                } else if (!!userId && RoomUtils.getRoomAdmin(room).id === userId && !!room && !!this.room && this.room.id! !== room.id) {
                    if (!!this.responseDataSubscription$ && !this.responseDataSubscription$.closed) this.disconnectFromResponseData();
                    this.connectToResponseData(room.id!);
                }
        });
    }

    connectToResponseData(roomId: string) {
        this.responseDataSubscription$ = this.responseDataSourceService
            .getResponseData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(r => this.responseData$.next(r));
    }

    disconnectFromResponseData() {
        this.responseDataSubscription$.unsubscribe();
        this.responseData$.next(null as any);
    }

    getAdminResponses() {
        const responseData = this.responseData$.value?.responses;
        if (responseData == undefined) {
            return [];
        }
        return Object.keys(responseData)
            .map(key => (responseData[key]));
    }

    getAdminResponsesForRound(roundId: number) {
        return this.getAdminResponses().filter(r => r.roundId === roundId);
    }

    getAdminResponsesForRoundAndUser(roundId: number) {
        const userResponses = this.getAdminResponsesForRound(roundId)
            .filter(r => r.playerId === this.store.selectSnapshot(AuthenticationState.userid));
        if (userResponses.length === 1) {
            return userResponses[0];
        } else {
            return null;
        }
    }

    userResponded(roundId: number) {
        const response = this.store.selectSnapshot(InformationState.response);
        return !!response && response.roundId == roundId;
    }

    getAdminResponseCountInfo(roundId: number) {
        return `${this.getAdminResponsesForRound(roundId).length} / ${RoomUtils.getActivePlayerCount(this.store)}`
    }
}