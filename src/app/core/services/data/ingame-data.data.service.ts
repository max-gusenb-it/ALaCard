import { Injectable } from "@angular/core";
import { BehaviorSubject, takeUntil } from "rxjs";
import { IngameData } from "../../models/interfaces";
import { IngameDataSourceService } from "../source/ingame-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";

@Injectable({
    providedIn: 'root'
})
export class IngameDataService extends RoomPlayerLoadBaseDataService {
    ingameData$: BehaviorSubject<IngameData> = new BehaviorSubject(null as any);

    constructor(private ingameDataSourceService: IngameDataSourceService) {
        super();
    }

    protected override disconnectFromData(): void {
        this.dataSubscription$.unsubscribe();
        this.ingameData$.next(null as any);
    }

    protected override connectToData(roomId: string): void {
        if (!!!this.ingameDataSourceService) return;
        this.dataSubscription$ = this.ingameDataSourceService
            .getIngameData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(i => this.ingameData$.next(i));
    }

    getIngameData() {
        return this.ingameData$.value;
    }

    getIngameData$() {
        return this.ingameData$.asObservable();
    }
}