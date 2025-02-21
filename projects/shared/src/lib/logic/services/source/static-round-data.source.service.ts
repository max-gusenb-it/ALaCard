import { Injectable } from '@angular/core';
import { FirestoreService } from "./firestore.source.service";
import { RoomRefHelperService } from '../helper/room-ref.helper.service';
import { gameDataRef, StaticRoundData, staticRoundDataRef } from '@shared';

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataSourceService {

    constructor(
        private firestoreService: FirestoreService<StaticRoundData>,
        private roomRefService: RoomRefHelperService
    ) {}

    createStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }

    getStaticRoundData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef
        );
    }

    updateStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.update(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }
}