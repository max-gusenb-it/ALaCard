import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { IngameData } from "../../models/interfaces/logic/game/IngameData";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
import { gameDetailsRef, ingameDataRef } from "../../constants/firestoreReferences";

@Injectable({
    providedIn: 'root'
})
export class IngameDataSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<IngameData>
    ) {}

    createInitialIngameData(roomId: string, userId?: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionsRef(this.store, userId)}/${roomId}/${gameDetailsRef}`,
            ingameDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                playedCardIndexes: [],
                rounds: [],
            }
        );
    }

    updateIngameData(ingameData: IngameData, userId?: string) {
        return this.firestoreService.update(
            `${RoomUtils.getRoomCollectionsRef(this.store, userId)}/${gameDetailsRef}`,
            ingameDataRef,
            ingameData
        );
    }
}