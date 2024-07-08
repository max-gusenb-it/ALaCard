import { IFirestoreBase } from "../IFirestoreBase";
import { ISettings } from "./ISettings";

export interface IUser extends IFirestoreBase {
    username: string;
    profilePicture: string;
    roomId: string | null;
    settings: ISettings;
}