export namespace InformationActions {
    export class SetRoom {
        static readonly type = '[RoomState] SetRoom';
        constructor(public roomID: string) {}
    }

    export class RoomRulesRead {
        static readonly type = '[GroundRules] RoomRulesRead';
        constructor() {}
    }
}