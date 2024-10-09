import { Injectable } from "@angular/core";
import { BehaviorSubject, takeUntil } from "rxjs";
import { StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataSourceService } from "../source/static-round-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataService extends RoomPlayerLoadBaseDataService {
    staticRoundData$: BehaviorSubject<StaticRoundData> = new BehaviorSubject(null as any);

    constructor(private staticRoundDataSourceService: StaticRoundDataSourceService) {
        super();
    }

    override disconnectFromData(): void {
        this.dataSubscription$.unsubscribe();
        this.staticRoundData$.next(null as any);
    }

    override connectToData(roomId: string): void {
        this.dataSubscription$ = this.staticRoundDataSourceService
            .getStaticRoundData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(s => this.staticRoundData$.next(s));
    }

    getStaticRoundData() {
        return this.staticRoundData$.value;
    }

    getStaticRoundData$() {
        return this.staticRoundData$.asObservable();
    }
}