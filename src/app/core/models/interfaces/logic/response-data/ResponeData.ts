import { FirestoreBase } from "../firestore-base";
import { Response } from "./Response";

export interface ResponseData extends FirestoreBase {
    responses: {
        [key: string]: Response;
    };
}