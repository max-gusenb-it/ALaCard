import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { RoomState } from "../state";
import { BehaviorSubject, Observable, Subscription, takeUntil } from "rxjs";
import { IngameData, Room } from "../models/interfaces";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { IngameDataSourceService } from "./data-source/ingame-data-source.service";
import { GameState } from "../models/enums";
import { RoomUtils } from "../utils/room.utils";

@Injectable({
    providedIn: 'root'
})
export class IngameDataService extends AngularLifecycle {
    ingameDataSubscription$: Subscription = null as any;
    ingameData$: BehaviorSubject<IngameData> = new BehaviorSubject(null as any);

    @Select(RoomState.room) room$!: Observable<Room>;

    constructor(private ingameDataSourceService: IngameDataSourceService) {
        super();

        this.room$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(room => {
                if ((!!!room || (!!room.game && room.game.state === GameState.ended)) && !!this.ingameDataSubscription$ && !this.ingameDataSubscription$.closed) {
                    this.ingameDataSubscription$.unsubscribe();
                    this.ingameData$.next(null as any);
                } else {
                    if (!!room.game && room.game.state === GameState.started && (!!!this.ingameDataSubscription$ || this.ingameDataSubscription$.closed)) {
                        this.ingameDataSubscription$ = this.ingameDataSourceService
                            .getIngameData$(room.id!, RoomUtils.getRoomCreator(room).id)
                            .pipe(takeUntil(this.destroyed$))
                            .subscribe(i => this.ingameData$.next(i));
                    }
                }
        });
    }

    getIngameData$() {
        return this.ingameData$.asObservable();
    }
}