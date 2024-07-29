import { IItError } from "../../models/interfaces";

export namespace ErrorMonitor {
    export class SetError {
        static readonly type = "[Anywhere] SetError";
        constructor(public error: IItError) {};
    }
}