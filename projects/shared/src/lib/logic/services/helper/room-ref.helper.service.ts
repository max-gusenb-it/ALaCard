import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, roomsRef, usersRef } from "@shared";
import { RoomState } from "projects/app/src/app/core/state";
import { RoomUtils } from "projects/app/src/app/core/utils/room.utils";

@Injectable({
    providedIn: 'root'
})
export class RoomRefHelperService {
    constructor(
        private store: Store
    ) { }

    /**
     * Returns collection reference for a room
     *
     * @export
     * @param {Store} store
     * @param {string} creatorId if the method is called at a point, where the room does not exist yet, the id of the room creator has to be provided
     * @returns {string}
     */
    getRoomCollectionRef(creatorId?: string) {
        const room = this.store.selectSnapshot(RoomState.room);
        if (!!!room && !creatorId) {
            // Currently joined in no room
            creatorId = this.store.selectSnapshot(AuthenticationState.userId);
        }
        if (!creatorId && !!room) {
            creatorId = RoomUtils.getRoomCreator(room).id;
        }
        return `${usersRef}/${creatorId}/${roomsRef}`;
    }
}