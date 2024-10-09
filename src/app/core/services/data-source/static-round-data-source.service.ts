import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
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

    createInitialStaticRoundData(roomId: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            staticRoundDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                round: null,
                playedCardIndexes: []
            }
        );
    }
}