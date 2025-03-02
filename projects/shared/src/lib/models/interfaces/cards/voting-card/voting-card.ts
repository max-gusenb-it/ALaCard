import { Card, VotingCardSettings } from "@shared";

export interface VotingCard extends Card {
    settings?: VotingCardSettings;
}