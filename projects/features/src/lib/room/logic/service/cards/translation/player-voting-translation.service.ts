import { Injectable } from "@angular/core";
import { VotingCardTranslationService } from "@features";
import { Card, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingTranslationService extends VotingCardTranslationService {    
    override getCardTitle(card: Card) {
        if (!Utils.isStringDefinedAndNotEmpty(card.title))
            return this.translateService.instant("features.room.game.card.playerVoting");
        return super.getCardTitle(card);
    }
}