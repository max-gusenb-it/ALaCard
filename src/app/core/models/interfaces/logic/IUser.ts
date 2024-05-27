import { IFirestoreBase } from "./IFirestoreBase";

export interface IUser extends IFirestoreBase {
    username: string;
    profilePicture: string;
}