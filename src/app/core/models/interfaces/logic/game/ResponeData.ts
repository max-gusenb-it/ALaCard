import { FirestoreBase } from "../FirestoreBase";

export interface ResponseData extends FirestoreBase {
    responses: any[];
}