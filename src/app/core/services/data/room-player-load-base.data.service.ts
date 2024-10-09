import { Select } from "@ngxs/store";
import { Observable, Subscription, takeUntil } from "rxjs";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";
import { RoomState } from "../../state";
import { Room } from "../../models/interfaces";
import { GameState } from "../../models/enums";


/**
 * Base for data service that can be used for services with data which every player has to load
 *
 * @export
 * @class PlayerLoadBaseDataService
 * @typedef {RoomPlayerLoadBaseDataService}
 * @extends {AngularLifecycle}
 */
export class RoomPlayerLoadBaseDataService extends AngularLifecycle {
    dataSubscription$: Subscription = null as any;

    @Select(RoomState.room) room$!: Observable<Room>;

    constructor() {
        super();

        this.room$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(room => {
                if ((!!!room || !!!room.game || room.game.state === GameState.ended)) {
                    if (!!this.dataSubscription$ && !this.dataSubscription$.closed) {
                        this.disconnectFromData();
                    }
                } else if (!!room.game && room.game.state === GameState.started && (!!!this.dataSubscription$ || this.dataSubscription$.closed)) {
                    this.connectToData(room.id!);
                }
        });
    }

    protected disconnectFromData() {
        return;
    }

    protected connectToData(roomId: string) {
        return;
    }
}