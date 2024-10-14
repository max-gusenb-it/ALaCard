import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { gameDataRef, ingameDataRef } from "../../constants/firestoreReferences";
import { DynamicRoundData, IngameData } from '../../models/interfaces';
import { FirestoreService } from './firestore.source.service';

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
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDataRef}`,
            ingameDataRef
        );
    }

    createIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }

    updateIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.update(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }
    
    updateDynamicRoundData(roomId: string, dynamicRoundData: DynamicRoundData) {
        return this.firestoreService.updateField(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            `dynamicRoundData`,
            dynamicRoundData
        );
    }
}