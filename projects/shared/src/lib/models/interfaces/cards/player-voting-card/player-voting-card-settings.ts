import { PlayerVotingResultConfig, CardSettings } from "@shared";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVoteDisabled: boolean;
    isAnonymous: boolean;
    payToDisplay: boolean;
    sipConfig?: PlayerVotingResultConfig;
}