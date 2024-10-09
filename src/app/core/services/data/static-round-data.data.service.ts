import { Injectable } from "@angular/core";
import { Select } from "@ngxs/store";
import { RoomState } from "../../state";
import { BehaviorSubject, Observable, Subscription, takeUntil } from "rxjs";
import { Room, StaticRoundData } from "../../models/interfaces";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { GameState } from "../../models/enums";
import { StaticRoundDataSourceService } from "../source/static-round-data.source.service";

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataService extends AngularLifecycle {
    // Todo: Create service base for this kind of service and admin load only version
    saticRoundDataSubscription$: Subscription = null as any;
    staticRoundData$: BehaviorSubject<StaticRoundData> = new BehaviorSubject(null as any);

    @Select(RoomState.room) room$!: Observable<Room>;

    constructor(private staticRoundDataSourceService: StaticRoundDataSourceService) {
        super();

        this.room$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(room => {
                if ((!!!room || !!!room.game || room.game.state === GameState.ended)) {
                    if (!!this.saticRoundDataSubscription$ && !this.saticRoundDataSubscription$.closed) {
                        this.saticRoundDataSubscription$.unsubscribe();
                        this.staticRoundData$.next(null as any);
                    }
                } else if (!!room.game && room.game.state === GameState.started && (!!!this.saticRoundDataSubscription$ || this.saticRoundDataSubscription$.closed)) {
                    this.saticRoundDataSubscription$ = this.staticRoundDataSourceService
                        .getStaticRoundData$(room.id!)
                        .pipe(takeUntil(this.destroyed$))
                        .subscribe(i => this.staticRoundData$.next(i));
                }
        });
    }

    getStaticRoundData() {
        return this.staticRoundData$.value;
    }

    getStaticRoundData$() {
        return this.staticRoundData$.asObservable();
    }
}