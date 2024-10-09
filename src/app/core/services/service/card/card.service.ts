import { playerNameWhitecard } from "src/app/core/constants/card";
import { PlayerState } from "src/app/core/models/enums";
import { Card, Player, Round } from "src/app/core/models/interfaces";
import { countSubstrings, getNFromArray } from "src/app/core/utils/utils";

export class CardService {
    createGameRound(baseRound: Round, card: Card, players: Player[]) : Round {
        players = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline);

        const playerWhiteCardCount = countSubstrings(card.text, playerNameWhitecard);
        if (playerWhiteCardCount > 0) {
            baseRound.playerIds = getNFromArray(players.map(p => p.id), playerWhiteCardCount)
        }
        return baseRound;
    }

    getCardText(card: Card) : string {
        return card.text;
    }
}