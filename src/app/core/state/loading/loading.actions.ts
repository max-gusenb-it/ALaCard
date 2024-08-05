export namespace LoadingActions {
    export class StartLoading {
        static readonly type = "[Loading] StartLoading";
        constructor() {}
    }

    export class EndLoading {
        static readonly type = "[Loading] EndLoading";
        constructor() {}
    }
}