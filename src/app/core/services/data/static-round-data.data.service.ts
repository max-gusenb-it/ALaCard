import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, takeUntil } from "rxjs";
import { Player, StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataSourceService } from "../source/static-round-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataDataService extends RoomPlayerLoadBaseDataService {
    staticRoundData$: BehaviorSubject<StaticRoundData | null> = new BehaviorSubject(null as any);

    constructor(
        store: Store,
        private staticRoundDataSourceService: StaticRoundDataSourceService
    ) {
        super(store);

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

    updateStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.staticRoundDataSourceService.updateStaticRoundData(
            staticRoundData,
            roomId
        )
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
}