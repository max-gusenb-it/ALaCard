import { IItError } from "@shared";

export namespace ErrorMonitorActions {
    export class SetError {
        static readonly type = "[Anywhere] SetError";
        constructor(public error: IItError) {};
    }
}