import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
import { gameDetailsRef, roundStartNotifierRef } from "../../constants/firestoreReferences";
import { RoundStartNotifier } from '../../models/interfaces/logic/game/RoundStartNotifier';

@Injectable({
    providedIn: 'root'
})
export class RoundStartNotifierSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<RoundStartNotifier>
    ) {}

    createInitialRoundStartNotifier(roomId: string, userId?: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionsRef(this.store, userId)}/${roomId}/${gameDetailsRef}`,
            roundStartNotifierRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date())
            }
        );
    }
}