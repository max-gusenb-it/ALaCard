import { CardType } from "../../models/enums";
import { CardUtils } from "../../models/interfaces/logic/cards/CardUtils";
import { PlayerVotingUtils } from "./playerVotingCardUtils";

export namespace CardUtilFactory {
    export function getCardUtils(cardType: CardType) : CardUtils {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return PlayerVotingUtils;
            }
            default: return null as any;
        }
    }
}