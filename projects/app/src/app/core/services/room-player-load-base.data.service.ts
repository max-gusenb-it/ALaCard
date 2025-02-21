import { Store } from "@ngxs/store";
import { Observable, Subject, Subscription, take, takeUntil } from "rxjs";
import { Room } from "../models/interfaces";
import { RoomState } from "../state";
import { 
    AngularLifecycle,
    GameState
} from '@shared';

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
    protected constructorDone$ = new Subject<unknown>();

    room$: Observable<Room | null>;
    room: Room | null;

    constructor(private base_store: Store) {
        super();

        this.room$ = this.base_store.select(RoomState.room);

        // Call logic in subsciption -> otherwise derived constructor maybe is not reached yet and injected classes are null
        this.constructorDone$
            .pipe(take(1))
            .subscribe(() => {
                this.room$
                    .pipe(takeUntil(this.destroyed$))
                    .subscribe(room => {
                        if ((!!!room || !!!room.game || room.game.state === GameState.ended)) {
                            if (!!this.dataSubscription$ && !this.dataSubscription$.closed) {
                                this.disconnectFromData();
                            }
                        } else if (!!room.game && room.game.state === GameState.started && (!!!this.dataSubscription$ || this.dataSubscription$.closed)) {
                            this.connectToData(room.id!);
                        } else if (!!room && !!this.room && this.room.id! !== room.id) {
                            if (!!this.dataSubscription$ && !this.dataSubscription$.closed) this.disconnectFromData();
                            this.connectToData(room.id!);
                        }
                        this.room = room;
                });
        });
    }

    protected disconnectFromData() {
        return;
    }

    protected connectToData(roomId: string) {
        return;
    }
}