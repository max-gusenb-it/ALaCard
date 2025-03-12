import { Injectable } from "@angular/core";
import { VotingCardTranslationService } from "@features";
import { PlayerVotingCard, PlayerVotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingTranslationService extends VotingCardTranslationService<PlayerVotingCard> {
    override get defaultSipDistributionGroup() {
        return PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer;
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