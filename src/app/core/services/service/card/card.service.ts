import { Card } from "src/app/core/models/interfaces";
import { Round } from "../../../models/interfaces/logic/game-data/round/round";

export class CardService {
    createGameRound(baseRound: Round) : Round {
        return baseRound;
    }

    getCardText(card: Card) : string {
        return card.text;
    }
}