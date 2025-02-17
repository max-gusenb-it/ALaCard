import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { FirestoreService } from "./firestore.source.service";
import { gameDataRef, responseDataRef } from "../../constants/firestoreReferences";
import { Response, ResponseData } from '../../models/interfaces';
import { RoomRefService } from '../service/room-ref.service';

@Injectable({
    providedIn: 'root'
})
export class ResponseDataSourceService {

    constructor(
        private firestoreService: FirestoreService<ResponseData>,
        private roomRefService: RoomRefService
    ) {}

    getResponseData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef
        );
    }

    createInitialResponseData(roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                responses: {}
            }
        );
    }

    addResponse(roomId: string, response: Response) {
        return this.firestoreService.updateField(
            `${this.roomRefService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef,
            `responses.${response.playerId}`,
            response
        );
    }
}