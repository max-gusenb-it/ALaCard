
import { FirestoreBase } from "@shared";
import { Response } from "./response"

// ToDO - structure: rename to responses

export interface ResponseData extends FirestoreBase {
    responses: {
        [key: string]: Response;
    };
}