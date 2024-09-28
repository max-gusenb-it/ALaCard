import { GameInformation } from "../../models/interfaces";

export namespace InformationActions {
    export class SetGameInformation {
        static readonly type = '[ToDo] SetGameInformation';
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
}