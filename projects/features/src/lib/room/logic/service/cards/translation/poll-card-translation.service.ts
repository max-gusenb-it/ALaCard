import { Injectable } from "@angular/core";
import { CardState, CardUtils, MarkdownUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService {
    override getOfflineCardText(
        card: Card,
        players: Player[],
        playerIds: string[] | undefined,
        specificPlayerID: string = "",
        isDrinkingGame: boolean,
        cardState: string = CardState.Card_Initial
    ): string {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);
        text += "<br><br>\n";

        const pollCard = CardUtils.castCard<PollCard>(card);
        pollCard.subjects.forEach(subject => {
            text += `* ${subject.title}\n`
        });

        const delaySipText = pollCard.settings?.delaySipText;
        if (isDrinkingGame) {
            if (delaySipText && CardUtils.isInitialCardState(cardState)) {
                text += "<br><br>\n\n" + MarkdownUtils.addTagToContent(
                    this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card"),
                    "span",
                    ["text-base"]
                );
            } else {
                text += "<br><br>\n\n" + this.getCardDrinkingText(card)
            }
        }
        return text;
    }
}