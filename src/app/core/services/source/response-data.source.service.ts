import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { FirestoreService } from "./firestore.source.service";
import { gameDataRef, responseDataRef } from "../../constants/firestoreReferences";
import { Response, ResponseData } from '../../models/interfaces';
import { RoomService } from '../service/room.service';

@Injectable({
    providedIn: 'root'
})
export class ResponseDataSourceService {

    constructor(
        private firestoreService: FirestoreService<ResponseData>,
        private roomService: RoomService
    ) {}

    getResponseData$(roomId: string) {
        return this.firestoreService.getDocWithId$(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef
        );
    }

    createInitialResponseData(roomId: string) {
        return this.firestoreService.upsert(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef,
            {
                creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
                responses: {}
            }
        );
    }

    addResponse(roomId: string, response: Response) {
        return this.firestoreService.updateField(
            `${this.roomService.getRoomCollectionRef()}/${roomId}/${gameDataRef}`,
            responseDataRef,
            `responses.${response.playerId}`,
            response
        );
    }
}