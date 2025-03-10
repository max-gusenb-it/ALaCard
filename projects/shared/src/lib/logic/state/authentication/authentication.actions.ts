import { ProfileEditorFormData, User, CreateAccountFormData } from "@shared";

export namespace AuthenticationActions {
    export class SignUpUser {
        static readonly type = '[SignUpModal] SignUp';
        constructor(public createAccountFormData: CreateAccountFormData, public profileFormData?: ProfileEditorFormData) {}
    }

    export class SignUpAnonymousUser {
        static readonly type = '[ItAddAccountModal] SignUpAnonymousUser';
        constructor(public email: string, public password: string) {}
    }

    export class SignInUser {
        static readonly type = '[SignInModal] SignIn';
        constructor(public email: string, public password: string) {}
    }

    export class ResetPassword {
        static readonly type = '[Reset Password Modal] ResetPassword';
        constructor(public email: string) {}
    }

    export class SetUserCredentials {
        static readonly type = '[AuthenticationState] SetUserCredentials';
        constructor(public uid?: string, public isAnonymous?: boolean) {}
    }

    export class SetUser {
        static readonly type = '[AuthenticationState] SetUser';
        constructor(public user?: User) {}
    }

    export class SetUserRoomId {
        static readonly type = '[RoomState] UpdateRoomIdOfUser';
        constructor(public roomId: string) {}
    }

    export class SignOut {
        static readonly type = '[HomePage] SignOut';
    }
}