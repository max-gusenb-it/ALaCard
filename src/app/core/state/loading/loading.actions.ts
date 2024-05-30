import { ILoadingError } from "./loading.model";

export namespace Loading {
    export class StartLoading {
        static readonly type = "[Loading] Starting Loading";
        constructor() {}
    }

    export class EndLoading {
        static readonly type = "[Loading] Ending Loading";
        constructor(public error?: ILoadingError) {}
    }
}