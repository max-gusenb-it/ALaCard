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

    getResponseData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            responseDataRef
        );
    }

    createInitialResponseData(roomId: string) {
        return this.firestoreService.upsert(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            responseDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                responses: {}
            }
        );
    }

    addResponse(roomId: string, response: Response) {
        return this.firestoreService.updateField(
            `${RoomUtils.getRoomCollectionRef(this.store)}/${roomId}/${gameDetailsRef}`,
            responseDataRef,
            `responses.${response.playerId}`,
            response
        );
    }
}