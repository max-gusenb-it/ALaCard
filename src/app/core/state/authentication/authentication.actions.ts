import { ICreateAccountFormData, IProfileEditorFormData, IUser } from "../../models/interfaces";

export namespace Authentication {
    export class SignUpUser {
        static readonly type = '[SignUpModal] SignUp';
        constructor(public profileFormData: IProfileEditorFormData, public createAccountFormData: ICreateAccountFormData) {}
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
        constructor(public user?: IUser) {}
    }

    export class SetUserRoomId {
        static readonly type = '[RoomState] UpdateRoomIdOfUser';
        constructor(public roomId: string) {}
    }

    export class SignOut {
        static readonly type = '[HomePage] SignOut';
    }
}