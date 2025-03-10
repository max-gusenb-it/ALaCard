import { VotingCardSettings } from "@shared";

export interface NewPlayerVotingCardSettings extends VotingCardSettings {
    selfVoteDisabled?: boolean;
}