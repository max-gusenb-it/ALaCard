import { Injectable } from "@angular/core";
import { CardUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService<PollCard> {
    override getOfflineCardText(card: Card, players: Player[], playerIds: string[] | undefined, specificPlayerID: string = "", isDrinkingGame: boolean): string {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);
        text += "<br><br>\n";

        const pollCard = CardUtils.castCard<PollCard>(card);
        pollCard.subjects.forEach(subject => {
            text += `* ${subject.title}\n`
        });

        if (isDrinkingGame) {
            text += "<br><br>\n\n" + this.getCardDrinkingText(card)
        }
        return text;
    }
}