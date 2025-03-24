import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs';
import { Store } from '@ngxs/store';
import { RoomRefHelperService, RoomSourceServiceErrors, Player, Room, PlayerUtils } from '@features';
import { AuthenticationState, ItError, roomsRef, usersRef, FirestoreService } from '@shared';

@Injectable({
    providedIn: 'root'
})
export class RoomSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<Room>,
        private roomRefService: RoomRefHelperService
    ) { }

    getRoom$(roomId: string, roomCreatorId?: string) {
        return this.firestoreService.getDocWithId$(this.roomRefService.getRoomCollectionRef(roomCreatorId), roomId)
            .pipe(
                catchError(() => {
                    throw new ItError(
                        RoomSourceServiceErrors.roomNotFound,
                        RoomSourceService.name
                    );
                })
            );
    }

    async getInitialRoom(roomId: string, creatorId: string) {
        const roomCollectionRef = this.roomRefService.getRoomCollectionRef(creatorId);
        let rooms = await this.firestoreService.getMostRecentDoc(roomCollectionRef);
        if (rooms.docs.length <= 0) {
            throw new ItError(
                RoomSourceServiceErrors.roomNotFound,
                RoomSourceService.name
            );
        }
        return Promise.resolve(
            {
                id: roomId,
                ...rooms.docs[0].data()
            } as Room
        );
    }

    createRoom(name: string) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!user && user.id) {
            const player = PlayerUtils.exportUserToPlayer(user, 0);
            return this.firestoreService.add(
                `${usersRef}/${user.id}/${roomsRef}`,
                {
                    creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                    name: name,
                    players: {
                        [player.id]: player
                    },
                    settings: {
                        singleDeviceMode: false,
                        otherAdmin: true,
                        autoContinueOnAllVotes: true
                    },
                    game: null
                }
            );
        } else {
            return Promise.reject();
        }
    }

    updateRoom(room: Room, roomId: string) {
        return this.firestoreService.update(`${this.roomRefService.getRoomCollectionRef()}`, roomId, room);
    }

    upsertPlayer(roomId: string, userId: string, player: Player, roomCreatorId?: string) {
        return this.firestoreService.updateField(
            this.roomRefService.getRoomCollectionRef(roomCreatorId),
            roomId,
            `players.${userId}`,
            player
        );
    }
}