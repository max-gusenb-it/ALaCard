import { Injectable } from '@angular/core';
import { FirestoreService } from "./firestore.source.service";
import { gameDataRef, staticRoundDataRef } from "../../constants/firestoreReferences";
import { StaticRoundData } from '../../models/interfaces';
import { RoomService } from '../service/room.service';

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataSourceService {

    constructor(
        private firestoreService: FirestoreService<StaticRoundData>,
        private roomService: RoomService
    ) {}

    createStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }

    getStaticRoundData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef
        );
    }

    updateStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.update(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }
}