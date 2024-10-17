import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, takeUntil } from "rxjs";
import { StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataSourceService } from "../source/static-round-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";
import { Store } from "@ngxs/store";
import { StaticRoundDataUtils } from "../../utils/static-round-data.utils";
import { RoomState } from "../../state";

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataService extends RoomPlayerLoadBaseDataService {
    staticRoundData$: BehaviorSubject<StaticRoundData | null> = new BehaviorSubject(null as any);

    constructor(
        private store: Store,
        private staticRoundDataSourceService: StaticRoundDataSourceService
    ) {
        super();

        this.constructorDone$.next(true);
    }

    protected override disconnectFromData(): void {
        this.dataSubscription$.unsubscribe();
        this.staticRoundData$.next(null as any);
    }

    protected override connectToData(roomId: string): void {
        this.dataSubscription$ = this.staticRoundDataSourceService
            .getStaticRoundData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(s => this.staticRoundData$.next(s));
    }

    getStaticRoundData() {
        return this.staticRoundData$.value;
    }

    getStaticRoundData$() : Observable<StaticRoundData> {
        return this.staticRoundData$
            .asObservable()
            .pipe(
                filter((s): s is StaticRoundData => s !== null)
            );
    }

    startNewRound() {
        const staticRoundData = this.getStaticRoundData();

        if (!!!staticRoundData) return;

        const round = StaticRoundDataUtils.createGameRound(
            this.store.selectSnapshot(RoomState.deck)!,
            staticRoundData,
            this.store.selectSnapshot(RoomState.players),
            this.store.selectSnapshot(RoomState.gameSettings)!
        );

        return this.staticRoundDataSourceService.updateStaticRoundData(
            {
                ...staticRoundData,
                round: round,
                playedCardIndexes: [
                    ...staticRoundData.playedCardIndexes,
                    round.cardIndex
                ]
            },
            this.store.selectSnapshot(RoomState.roomId)!
        );
    }
}