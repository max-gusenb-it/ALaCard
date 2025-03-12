import { Injectable } from "@angular/core";
import { CardState, CardUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PollCard } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService<PollCard> {
    override get defaultSipDistributionGroup(): string {
        return QuizCardGroup.QuizCard_AllTargets;
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
        text += "<br><br>\n";

        const pollCard = CardUtils.castCard<PollCard>(card);
        pollCard.subjects.forEach(subject => {
            text += `* ${subject.title}\n`
        });

        const delaySipText = pollCard.settings?.delaySipText;
        if (isDrinkingGame) {
            if (delaySipText && cardState === CardState.Card_Initial) {
                text += "<br><br>\n\n" + this.translateService.instant("features.room.game.game-cards.offline-sip-display.sips-on-next-card");
            } else {
                text += "<br><br>\n\n" + this.getCardDrinkingText(card)
            }
        }
        return text;
    }
}