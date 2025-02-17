import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Room } from "../../models/interfaces/logic/room/room";
import { FirestoreService } from "./firestore.source.service";
import { RoomSourceServiceErrors } from '../../constants/errorCodes';
import { bufferTime, catchError, firstValueFrom, map } from 'rxjs';
import { Player } from '../../models/interfaces';
import { ItError } from '../../models/classes';
import { UserUtils } from '../../utils/user.utils';
import { roomsRef, usersRef } from '../../constants/firestoreReferences';
import { Store } from '@ngxs/store';
import { AuthenticationState } from '../../state';
import { RoomRefService } from '../service/room-ref.service';

@Injectable({
    providedIn: 'root'
})
export class RoomSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<Room>,
        private roomRefService: RoomRefService
    ) { }

    getRoom$(roomId: string, roomCreatorId?: string) {
        const roomCollectionRef = this.roomRefService.getRoomCollectionRef(roomCreatorId);
        console.log ("Room collection ref:", roomCollectionRef);
        console.log ("Room id:", roomId)
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

    async getInitialRoom$(roomId: string, creatorId: string) {
        const roomCollectionRef = this.roomRefService.getRoomCollectionRef(creatorId);
        let test = await this.firestoreService.getDocVersionTwo$(roomCollectionRef, roomId);
        console.log ("Room 2: ", test.docs.length > 0 ? test.docs[0].data() : "No docs loaded")
        return await firstValueFrom(
            this.getRoom$(roomId, creatorId)
                .pipe(
                    // Wait for 1500 ms so actuall room settings are loaded and not cached value -> singleDeviceMode join bug
                    bufferTime(1500),
                    map(buffer => buffer.slice(-1)[0])
                )
            ).then(
                r => {
                    console.log ("Initial load room - success: ", r);
                    return r;
                },
                e => {
                    console.log ("Initial load room - error: ", e);
                    throw e;
            }
        );
    }

    createRoom(name: string, description: string) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!user && user.id) {
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