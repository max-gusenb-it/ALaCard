import { VotingCardSettings } from "@shared";

export interface PlayerVotingCardSettings extends VotingCardSettings {
    selfVoteDisabled?: boolean;
}