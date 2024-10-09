import { Card, Round } from "src/app/core/models/interfaces";

export class CardService {
    createGameRound(baseRound: Round) : Round {
        return baseRound;
    }

    getCardText(card: Card) : string {
        return card.text;
    }
}