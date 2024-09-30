import { FirestoreBase } from "../firestore-base";
import { Settings } from "./settings";

export interface User extends FirestoreBase {
    username: string;
    profilePicture: string;
    roomId: string | null;
    settings: Settings;
}