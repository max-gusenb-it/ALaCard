import { CardType } from "../models/enums";
import { FreeTextCardService, FTCardService } from "../services/service/card/free-text-card.service";
import { PlayerVotingCardService, PVCardService } from "../services/service/card/player-voting-card.service";
import { PCardService } from "../services/service/card/poll-card.service";

export namespace CardUtils {
    export type CardService = PlayerVotingCardService | FreeTextCardService;

    export function getCardService(cardType: CardType) : CardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return PVCardService;
            }
            case(CardType.TopicVotingCard): {
                return PCardService;
            }
            default: return FTCardService;
        }
    }
}