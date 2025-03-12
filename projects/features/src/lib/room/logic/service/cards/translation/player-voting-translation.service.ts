import { Injectable } from "@angular/core";
import { CardState, CardUtils, MarkdownUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PlayerVotingCard, PlayerVotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingTranslationService extends VotingCardTranslationService {
    override get defaultSipDistributionGroup() {
        return PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer;
    }

    override getOfflineCardText(
        card: Card,
        players: Player[],
        playerIds: string[] | undefined,
        specificPlayerID: string = "",
        isDrinkingGame: boolean,
        cardState: string = CardState.Card_Initial
    ): string {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);

        const delaySipText = CardUtils.castCard<PlayerVotingCard>(card).settings?.delaySipText;
        if (isDrinkingGame) {
            text += "<br><br>\n";
            if (delaySipText && cardState === CardState.Card_Initial) {
                text += MarkdownUtils.addTagToContent(
                    this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card"),
                    "span",
                    ["text-base"]
                );
            } else {
                text += this.getCardDrinkingText(card)
            }
        }
        return text;
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