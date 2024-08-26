import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
import { gameDetailsRef, responseDataRef } from "../../constants/firestoreReferences";
import { ResponseData } from '../../models/interfaces/logic/game/ResponeData';

@Injectable({
    providedIn: 'root'
})
export class ResponseDataSourceServicee {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<ResponseData>
    ) {}

    createInitialResponseData(roomId: string, userId?: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionsRef(this.store, userId)}/${roomId}/${gameDetailsRef}`,
            responseDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                responses: []
            }
        );
    }
}