import { GameInformation, Response } from "@shared";

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
    
    export class SetCardAnimationSkippedClicked {
        static readonly type = '[CardContainer] SetRoundCardClicked';
        constructor(public cardAnimationSkipped: boolean) {};
    }

    export class SetRoundResponded {
        static readonly type = "[CardForm] SetRoundResponded";
        constructor(public response: Response) {};
    }

    export class SetTutorialDisplayed {
        static readonly type = "[GameRulesComponent] SetTutorialDisplayed";
        constructor(public labelId: string)  {}
    }
}