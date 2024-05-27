import { IUser } from "../../models/interfaces";

export interface AuthenticationStateModel {
    uid?: string;
    isAnonymous?: boolean;
    user?: IUser;
}