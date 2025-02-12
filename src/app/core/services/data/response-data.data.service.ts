import { BehaviorSubject, filter, map, Observable, Subscription, takeUntil } from "rxjs";
import { ResponseData, Room } from "../../models/interfaces";
import { ResponseDataSourceService } from "../source/response-data.source.service";
import { Select, Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { Injectable } from "@angular/core";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { GameState } from "../../models/enums";
import { InformationState } from "../../state/information";
import { RoomService } from "../service/room.service";

@Injectable({
    providedIn: 'root'
})
export class ResponseDataDataService extends AngularLifecycle {
    responseDataSubscription$: Subscription = null as any;
    responseData$: BehaviorSubject<ResponseData> = new BehaviorSubject(null as any);

    room$!: Observable<Room | null>;
    room: Room;

    constructor(
        private store: Store,
        private roomService: RoomService,
        private responseDataSourceService: ResponseDataSourceService
    ) {
        super();

        this.room$ = this.store.select(RoomState.room);

        this.room$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(room => {
                const userId = this.store.selectSnapshot(AuthenticationState.userId);
                if (!!!room || !!!room.game || room.game.state === GameState.ended || this.roomService.getRoomAdmin().id !== userId) {
                    if (!!this.responseDataSubscription$ && !this.responseDataSubscription$.closed) {
                        this.disconnectFromResponseData();
                    };
                } else if (userId && !!room.game && room.game.state === GameState.started && this.roomService.getRoomAdmin().id === userId && (!!!this.responseDataSubscription$ || this.responseDataSubscription$.closed)) {
                    this.connectToResponseData(room.id!);
                } else if (userId && this.roomService.getRoomAdmin().id === userId && !!room && !!this.room && this.room.id! !== room.id) {
                    if (!!this.responseDataSubscription$ && !this.responseDataSubscription$.closed) this.disconnectFromResponseData();
                    this.connectToResponseData(room.id!);
                }
        });
    }

    connectToResponseData(roomId: string) {
        this.responseDataSubscription$ = this.responseDataSourceService
            .getResponseData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(r => {
                this.responseData$.next(r);
        });
    }

    disconnectFromResponseData() {
        this.responseDataSubscription$.unsubscribe();
        this.responseData$.next(null as any);
    }

    getAdminResponses$() {
        return this.responseData$
            .asObservable()
            .pipe(
                filter(r => !!r?.responses),
                map(r => Object.keys(r.responses).map(key => (r.responses[key])))
            );
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
            .filter(r => r.playerId === this.store.selectSnapshot(AuthenticationState.userId));
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
}