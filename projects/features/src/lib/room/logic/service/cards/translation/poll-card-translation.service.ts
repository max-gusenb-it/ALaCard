import { Injectable } from "@angular/core";
import { CardState, CardUtils, MarkdownUtils, Player, VotingCardTranslationService } from "@features";
import { Card, PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService {
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