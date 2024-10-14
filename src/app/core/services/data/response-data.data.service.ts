import { BehaviorSubject, map, Observable, Subscription, takeUntil } from "rxjs";
import { Response, ResponseData, Room } from "../../models/interfaces";
import { ResponseDataSourceService } from "../source/response-data.source.service";
import { Select, Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { Injectable } from "@angular/core";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { GameState } from "../../models/enums";
import { RoomUtils } from "../../utils/room.utils";

@Injectable({
    providedIn: 'root'
})
export class ResponseDataService extends AngularLifecycle {
    responseDataSubscription$: Subscription = null as any;
    responseData$: BehaviorSubject<ResponseData> = new BehaviorSubject(null as any);

    @Select(RoomState.room) room$!: Observable<Room>;

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
                        this.responseDataSubscription$.unsubscribe();
                        this.responseData$.next(null as any);
                    };
                } else if (!!userId && !!room.game && room.game.state === GameState.started && RoomUtils.getRoomAdmin(room).id === userId && (!!!this.responseDataSubscription$ || this.responseDataSubscription$.closed)) {
                    this.responseDataSubscription$ = this.responseDataSourceService
                        .getResponseData$(room.id!)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(r => this.responseData$.next(r));
                }
        });
    }

    getResponses() {
        const responseData = this.responseData$.value?.responses;
        if (responseData == undefined) {
            return [];
        }
        return Object.keys(responseData)
            .map(key => (responseData[key]));
    }

    getResponsesForRound(roundId: number) {
        return this.getResponses().filter(r => r.roundId === roundId);
    }

    getResponsesForRoundAndUser(roundId: number) {
        const userResponses = this.getResponsesForRound(roundId)
            .filter(r => r.playerId === this.store.selectSnapshot(AuthenticationState.userid));
        if (userResponses.length === 1) {
            return userResponses[0];
        } else {
            return null;
        }
    }

    userResponded(roundId: number) {
        return this.checkIfUserResponded(this.getResponses(), roundId);
    }

    private checkIfUserResponded(responses: Response[], roundId: number) {
        return !!responses.find(r => r.playerId === this.store.selectSnapshot(AuthenticationState.userid) && r.roundId === roundId);
    }

    getRulesReadInfo(roundId: number) {
        return `${this.getResponsesForRound(roundId).length} / ${RoomUtils.getActivePlayerCount(this.store)}`
    }
}