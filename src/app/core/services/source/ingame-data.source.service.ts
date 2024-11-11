import { Injectable } from '@angular/core';
import { gameDataRef, ingameDataRef } from "../../constants/firestoreReferences";
import { DynamicRoundData, IngameData } from '../../models/interfaces';
import { FirestoreService } from './firestore.source.service';
import { RoomService } from '../service/room.service';

@Injectable({
    providedIn: 'root'
})
export class IngameDataSourceService {

    constructor(
        private firestoreService: FirestoreService<IngameData>,
        private roomSerivce: RoomService
    ) {}

    getIngameData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomSerivce.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef
        );
    }

    createIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomSerivce.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }

    updateIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.update(
            `${this.roomSerivce.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }
    
    updateDynamicRoundData(roomId: string, dynamicRoundData: DynamicRoundData) {
        return this.firestoreService.updateField(
            `${this.roomSerivce.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            `dynamicRoundData`,
            dynamicRoundData
        );
    }
}