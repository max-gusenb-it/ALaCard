import { User } from "@shared";

export interface AuthenticationStateModel {
    uid?: string;
    isAnonymous?: boolean;
    user?: User;
}