import { GameInformation } from "@shared";

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
        constructor(public response: any) {};
    }

    export class DisplayDualTutorial {
        static readonly type = "[InformationState] DisplayDualTutorial";
        constructor(
            public mobileLabelID: string,
            public desktopLabelID: string,
            public icon?: string
        ) {}
    }

    export class NewDisplayTutorial {
        static readonly type = "[InformationState] NewDisplayTutorial";
        constructor(
            public labelID: string,
            public icon?: string,
        ) {}
    }

    export class SetJoinedInSingleDeviceMode {
        static readonly type = "[InformationState] SetJoinedInSingleDeviceMode";
        constructor(public joinedInSingleDeviceMode: boolean) {}
    }
}