import { CardSettings } from "../card-settings";
import { PlayerVotingResultConfig } from "./player-voting-result-config";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVoteDisabled: boolean;
    isAnonymous: boolean;
    payToDisplay: boolean;
    sipConfig?: PlayerVotingResultConfig;
}