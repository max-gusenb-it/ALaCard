import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Room } from "../../models/interfaces/logic/room/Room";
import { FirestoreService } from "./firestore.service";
import { Store } from "@ngxs/store";
import { AuthenticationState } from "../../state";
import { RoomSourceServiceErrors } from '../../constants/errorCodes';
import { catchError } from 'rxjs';
import { Player } from '../../models/interfaces';
import { ItError } from '../../models/classes';
import { UserUtils } from '../../utils/user.utils';
import { RoomUtils } from '../../utils/room.utils';
import { roomsRef, usersRef } from '../../constants/firestoreReferences';

@Injectable({
    providedIn: 'root'
})
export class RoomSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<Room>
    ) { }

    getRoom$(roomId: string, roomCreatorId?: string) {
        return this.firestoreService.getDocWithId$(RoomUtils.getRoomCollectionRef(this.store, roomCreatorId), roomId)
            .pipe(
                catchError(e => {
                    throw new ItError(
                        RoomSourceServiceErrors.roomNotFound,
                        RoomSourceService.name
                    );
                })
            );
    }

    createRoom(name: string, description: string) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!user && !!user.id) {
            const player = UserUtils.exportUserToPlayer(user, 0);
            return this.firestoreService.add(
                `${usersRef}/${user.id}/${roomsRef}`,
                {
                    creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                    name: name,
                    description: description,
                    players: {
                        [player.id]: player
                    },
                    settings: {
                        singleDeviceMode: false,
                        otherAdmin: true
                    },
                    game: null
                }
            );
        } else {
            return Promise.reject();
        }
    }

    updateRoom(room: Room, roomId: string) {
        return this.firestoreService.update(`${RoomUtils.getRoomCollectionRef(this.store)}`, roomId, room);
    }

    updatePlayer(roomId: string, userId: string, player: Player, roomCreatorId?: string) {
        return this.firestoreService.updateField(
            RoomUtils.getRoomCollectionRef(this.store, roomCreatorId),
            roomId,
            `players.${userId}`,
            player
        );
    }
}