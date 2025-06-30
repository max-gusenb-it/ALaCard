import { Injectable } from "@angular/core";
import { VotingCardTranslationService } from "@features";
import { Card, PlayerVotingCardGroup, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingTranslationService extends VotingCardTranslationService {
    override get defaultSipDistributionGroup() {
        return PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer;
    }
    
    override getCardTitle(card: Card) {
        if (!Utils.isStringDefinedAndNotEmpty(card.title))
            return this.translateService.instant("features.room.game.card.playerVoting");
        return super.getCardTitle(card);
    }

    override getSipTextForGroup(group: string) {
        switch(group) {
            case(PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer): {
                return this.translateService.instant("features.room.game.game-cards.offline-sip-display.most-voted-player");
            }
            default: return super.getSipTextForGroup(group);
        }
    }
}