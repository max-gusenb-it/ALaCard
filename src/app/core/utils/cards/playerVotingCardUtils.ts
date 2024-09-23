import { Card, Round } from "../../models/interfaces";
import { CardUtils } from "../../models/interfaces/logic/cards/CardUtils";

class PlayerVotingCardUtils implements CardUtils {
    createGameRound(card: Card, baseRound: Round): Round {
        throw new Error("Method not implemented.");
    }
}

export const PlayerVotingUtils = new PlayerVotingCardUtils();