import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.source.service";
import { gameDetailsRef, staticRoundDataRef } from "../../constants/firestoreReferences";
import { StaticRoundData } from '../../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class StaticRoundDataSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<StaticRoundData>
    ) {}

    createStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }

    getStaticRoundData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            staticRoundDataRef
        );
    }

    updateStaticRoundData(staticRoundData: StaticRoundData, roomId: string) {
        return this.firestoreService.update(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            staticRoundDataRef,
            staticRoundData
        );
    }
}