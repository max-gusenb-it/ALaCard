import { CardSettings } from "../card-settings";
import { PlayerVotingResultConfig } from "../../../../../../../features/src/lib/room/models/interfaces/cards/results/player-voting-card/player-voting-result-config";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVoteDisabled: boolean;
    isAnonymous: boolean;
    payToDisplay: boolean;
    sipConfig?: PlayerVotingResultConfig;
}