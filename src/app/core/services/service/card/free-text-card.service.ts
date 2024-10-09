import { FreeTextCard } from "src/app/core/models/interfaces/logic/cards/freeTextCard/free-text-card";
import { CardService } from "./card.service";

class FreeTextCardService extends CardService {
    override getCardText(card: FreeTextCard): string {
        return card.text;
    }
}

export const FTCardService = new FreeTextCardService();