import { RoundInformation } from "./round-information";

export interface GameInformation {
    compareValue: number;
    rulesReadSend: boolean;
    gameRulesCardIndex: number;
    roundInformation: RoundInformation | undefined;
}