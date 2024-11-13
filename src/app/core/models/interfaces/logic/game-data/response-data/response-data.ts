
import { FirestoreBase } from "../../firestore-base";
import { Response } from "./response"

export interface ResponseData extends FirestoreBase {
    responses: {
        [key: string]: Response;
    };
}