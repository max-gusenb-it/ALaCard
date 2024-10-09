import { CardService } from "./card.service";
import { PlayerVotingCard } from "src/app/core/models/interfaces/logic/cards/playerVotingCard/player-voting-card";

class PlayerVotingCardService extends CardService {
    override getCardText(card: PlayerVotingCard): string {
        return card.text;
    }
}

export const PVCardService = new PlayerVotingCardService();