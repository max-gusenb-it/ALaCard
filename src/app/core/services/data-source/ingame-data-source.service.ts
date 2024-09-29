import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
import { gameDetailsRef, ingameDataRef } from "../../constants/firestoreReferences";
import { IngameData } from '../../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class IngameDataSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<IngameData>
    ) {}

    getIngameData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            ingameDataRef
        );
    }

    createIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            ingameDataRef,
            ingameData
        );
    }

    updateIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.update(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            ingameDataRef,
            ingameData
        );
    }
}