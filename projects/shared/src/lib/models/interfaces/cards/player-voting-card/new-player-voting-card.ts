import { NewPlayerVotingCardSettings, VotingCard } from "@shared";

export interface NewPlayerVotingCard extends VotingCard {
    settings: NewPlayerVotingCardSettings;
}