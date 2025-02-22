import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, Observable, takeUntil } from "rxjs";
import { RoomPlayerLoadBaseDataService, StaticRoundDataSourceService, StaticRoundData } from "@features";
import { CardStates } from "@shared";
import { Store } from "@ngxs/store";

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataDataService extends RoomPlayerLoadBaseDataService {
    staticRoundData$: BehaviorSubject<StaticRoundData | null> = new BehaviorSubject(null as any);

    get cardState() : string {
        return this.staticRoundData$.value?.round?.cardState ?? CardStates.card_initial;
    }

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