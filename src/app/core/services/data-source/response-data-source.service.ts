import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Store } from "@ngxs/store";
import { RoomUtils } from "../../utils/room.utils";
import { FirestoreService } from "./firestore.service";
import { gameDetailsRef, responseDataRef } from "../../constants/firestoreReferences";
import { Response, ResponseData } from '../../models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ResponseDataSourceService {

    constructor(
        private store: Store,
        private firestoreService: FirestoreService<ResponseData>
    ) {}

    // ToDo: Make store for storing general information about players, that should be stored in cache

    // Example -> Flag, if user has already sent response for current game.

    createInitialResponseData(roomId: string, roomOwnerId?: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionsRef(this.store, roomOwnerId)}/${roomId}/${gameDetailsRef}`,
            responseDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                responses: {}
            }
        );
    }

    addResponse(roomId: string, response: Response, roomOwnerId?: string) {
        return this.firestoreService.updateField(
            `${RoomUtils.getRoomCollectionsRef(this.store, roomOwnerId)}/${roomId}/${gameDetailsRef}`,
            responseDataRef,
            `responses.${response.playerId}`,
            response
        );
    }
}