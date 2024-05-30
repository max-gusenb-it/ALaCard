import { ICreateAccountFormData, IProfileEditorFormData, IUser } from "../../models/interfaces";

export namespace Authentication {
    export class SignUpUser {
        static readonly type = '[SignUpModal] Sign up';
        constructor(public profileFormData: IProfileEditorFormData, public createAccountFormData: ICreateAccountFormData) {}
    }

    export class SignInUser {
        static readonly type = '[SignInModal] Sign in';
        constructor(public email: string, public password: string) {}
    }

    export class SetUserCredentials {
        static readonly type = '[AuthenticationState] Set user credentials';
        constructor(public uid?: string, public isAnonymous?: boolean) {}
    }

    export class SetUser {
        static readonly type = '[AuthenticationState] Set user';
        constructor(public user?: IUser) {}
    }

    export class SignOut {
        static readonly type = '[HomePage] Sign out';
    }
}