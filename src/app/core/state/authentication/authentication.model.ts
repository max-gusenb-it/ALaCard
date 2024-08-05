import { User } from "../../models/interfaces";

export interface AuthenticationStateModel {
    uid?: string;
    isAnonymous?: boolean;
    user?: User;
}