import { GameInformation, Response } from "../../models/interfaces";

export namespace InformationActions {
    export class SetGameInformation {
        static readonly type = '[RoomState] SetGameInformation';
        constructor(public gameInformation: GameInformation) {}
    }

    export class GameRulesRead {
        static readonly type = '[GroundRules] GameRulesRead';
        constructor() {}
    }

    export class SetGameRulesCardIndex {
        static readonly type = '[GameRuleComponent] SetGameRulesCardIndex';
        constructor(public gameRulesCardIndex: number) {}
    }

    export class SetRoundId {
        static readonly type = '[CardContainer] SetRoundId';
        constructor(public roundId: number) {};
    }
    
    export class SetRoundCardClicked {
        static readonly type = '[CardContainer] SetRoundCardClicked';
        constructor() {};
    }

    export class SetRoundResponded {
        static readonly type = "[CardForm] SetRoundResponded";
        constructor(public response: Response) {};
    }
}