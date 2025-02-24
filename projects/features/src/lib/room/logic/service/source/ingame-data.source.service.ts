import { Injectable } from '@angular/core';
import { FirestoreService, gameDataRef, ingameDataRef } from '@shared';
import { RoomRefHelperService, IngameData, DynamicRoundData} from '@features';

@Injectable({
    providedIn: 'root'
})
export class IngameDataSourceService {

    constructor(
        private firestoreService: FirestoreService<IngameData>,
        private roomRefService: RoomRefHelperService
    ) {}

    getIngameData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef
        );
    }

    createIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }

    updateIngameData(ingameData: IngameData, roomId: string) {
        return this.firestoreService.update(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            ingameData
        );
    }
    
    updateDynamicRoundData(roomId: string, dynamicRoundData: DynamicRoundData) {
        return this.firestoreService.updateField(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            ingameDataRef,
            `dynamicRoundData`,
            dynamicRoundData
        );
    }
}