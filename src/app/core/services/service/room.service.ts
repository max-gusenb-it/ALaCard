import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { ItAuthenticateModal } from "src/app/shared/components/forms/it-authenticate-modal/it-authenticate-modal.component";
import { RoomServiceErrors } from "../../constants/errorCodes";
import { ItError } from "../../models/classes";
import { PopupService } from "./popup.service";
import { combineLatest, filter, map, of, take } from "rxjs";
import { Room } from "../../models/interfaces";
import { InformationState } from "../../state/information";
import { roomsRef, usersRef } from "../../constants/firestoreReferences";
import { RoomUtils } from "../../utils/room.utils";
import { PlayerState } from "../../models/enums";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(
        private store: Store,
        private popupService: PopupService
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

    async checkIfUserExists() {
        let user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!!user) {
            const modal = await this.popupService.openModal({
                component: ItAuthenticateModal
            });
            await modal.onDidDismiss();
            user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user) throw new ItError(RoomServiceErrors.joinRoomNoUser, RoomService.name);
        }
        return user;
    }

    getRoomLoaded$(roomId: string, initialRoom: Room) {
        return combineLatest([
            this.store.select(RoomState.room)
                .pipe(
                    filter(room => !!room && !!room.id && room.id === roomId),
                    take(1)
                ),
            !!initialRoom.game 
                ? this.store.select(InformationState.gameInformation)
                    .pipe(
                        filter(g => g!.compareValue === initialRoom.game?.compareValue),
                        take(1)
                    ) 
                : of(null)
            ]
        ).pipe(
            take(1),
            map(() => true)
        );
    }

    isUserAdmin() {
        return this.store.selectSnapshot(AuthenticationState.user)?.id === RoomUtils.getRoomAdmin(this.store.selectSnapshot(RoomState.room)!)?.id;
    }

    getActivePlayerCount() {
        const players = this.store.selectSnapshot(RoomState.room)!.players;
        if (!!!players) return 0;
        return RoomUtils.mapPlayersToArray(players).filter(p => p.state === PlayerState.active || p.state === PlayerState.offline).length;
    }
}