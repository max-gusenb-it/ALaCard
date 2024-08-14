import { Card } from "../Card";
import { PlayerVotingCardSettings } from "./PlayerVotingCardSettings";

export interface PlayerVotingCard extends Card {
    text: string;
    settings: PlayerVotingCardSettings;
}