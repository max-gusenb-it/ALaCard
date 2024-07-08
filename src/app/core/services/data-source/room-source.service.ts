import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { IRoom } from "../../models/interfaces/logic/room/IRoom";
import { FirestoreService } from "./firestore.service";
import { Store } from "@ngxs/store";
import { AuthenticationState, LoadingError } from "../../state";
import { RoomSourceServiceErrors } from '../../constants/errorCodes';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoomSourceService {
    private readonly usersRef = "users";
    private readonly roomsRef = "rooms";

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<IRoom>
    ) { }

    ref(userId: string) {
        return `${this.usersRef}/${userId}/${this.roomsRef}`;
    }

    getRoom$(id: string) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!user && !!user.id) {
            return this.firestoreService.getDocWithId$(this.ref(user?.id!), id);
        } else {
            return throwError(() =>
                new LoadingError(
                    RoomSourceServiceErrors.roomNotFound,
                    RoomSourceService.name
                )
            );
        }
    }

    createRoom(name: string, description: string) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!user && !!user.id) {
            return this.firestoreService.add(
                this.ref(user.id),
                {
                    creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                    name: name,
                    description: description,
                    players: {}
                }
            );
        } else {
            return Promise.reject();
        }
    }
}