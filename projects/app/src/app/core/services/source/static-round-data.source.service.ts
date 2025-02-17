import { Injectable } from '@angular/core';
import { FirestoreService } from "./firestore.source.service";
import { gameDataRef, staticRoundDataRef } from "../../constants/firestoreReferences";
import { StaticRoundData } from '../../models/interfaces';
import { RoomRefService } from '../service/room-ref.service';

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataSourceService {

    constructor(
        private firestoreService: FirestoreService<StaticRoundData>,
        private roomRefService: RoomRefService
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