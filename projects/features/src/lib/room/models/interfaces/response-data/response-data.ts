
import { FirestoreBase } from "@shared";
import { Response } from "./response"

export interface ResponseData extends FirestoreBase {
    responses: {
        [key: string]: Response;
    };
}