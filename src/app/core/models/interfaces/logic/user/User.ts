import { FirestoreBase } from "../FirestoreBase";
import { Settings } from "./Settings";

export interface User extends FirestoreBase {
    username: string;
    profilePicture: string;
    roomId: string | null;
    settings: Settings;
}