import { IItError } from "../../models/interfaces";

export namespace ErrorMonitorActions {
    export class SetError {
        static readonly type = "[Anywhere] SetError";
        constructor(public error: IItError) {};
    }
}