import { PlayerVotingCardSettings, VotingCard } from "@shared";

export interface PlayerVotingCard extends VotingCard {
    settings?: PlayerVotingCardSettings;
}