import { Card } from "../card";
import { PlayerVotingCardSettings } from "./player-voting-card-settings";

export interface PlayerVotingCard extends Card {
    settings: PlayerVotingCardSettings;
}