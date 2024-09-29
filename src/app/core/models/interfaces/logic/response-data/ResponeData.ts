import { FirestoreBase } from "../FirestoreBase";
import { Response } from "./Response";

export interface ResponseData extends FirestoreBase {
    responses: {
        [key: string]: Response;
    };
}