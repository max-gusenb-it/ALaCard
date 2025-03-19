import { Injectable } from "@angular/core";
import { CardUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PollCard, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService {
    override getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customTitle))
            return card.settings!.customTitle;
        return this.translateService.instant("features.room.game.card.poll");
    }

    override getGameText(
        card: Card,
        players: Player[],
        playerIDs: string[],
        specificPlayerID: string,
        cardState: string,
        isSingleDeviceMode: boolean
    ): string {
        let text = super.getGameText(card, players, playerIDs, specificPlayerID, cardState, isSingleDeviceMode);

        text += this.getSubjectsText(card, cardState);

        return text;
    }

    protected getSubjectsText(card: Card, cardState?: string): string {
        let text = "<br><br>\n";
        const pollCard = CardUtils.castCard<PollCard>(card);
        pollCard.subjects.forEach(subject => {
            text += `* ${subject.title}\n`
        });
        return text;
    }
}