import { CardType } from "../models/enums";
import { CardService } from "../services/service/card/card.service";
import { FTCardService } from "../services/service/card/free-text-card.service";
import { PVCardService } from "../services/service/card/player-voting-card.service";

export namespace CardUtils {
    export function getCardService(cardType: CardType) : CardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return PVCardService;
            }
            default: return FTCardService;
        }
    }
}