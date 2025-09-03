import { Injectable } from "@angular/core";
import { CardTranslationService, CardUtils, Player, votingCardSkipValue, VotingResult } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Card, Subject, Utils, VotingCard } from "@shared";
import { MarkdownPipe } from "projects/shared/src/lib/logic/pipes/markdown.pipe";

@Injectable({
    providedIn: 'root'
})
export class VotingCardTranslationService extends CardTranslationService {

    constructor(override translateService: TranslateService, override markdownPipe: MarkdownPipe) {
        super(translateService, markdownPipe);
    }

    getResultsHeading(subjects: Subject[], topResults: VotingResult[]) : string {
        if (topResults.length > 0) {
            return Utils.addComaToStringArray(
                topResults.map(r => subjects.find(s => r.subjectID === s.ID)!.title),
                    true
                );
        } else {
            return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
        }
    }

    getResultTitle(result: VotingResult, resultIndex: number, subjects: Subject[], topResults: VotingResult[]) : string {
        if (result.subjectID === votingCardSkipValue) return this.translateService.instant("shared.components.display.it-result.skipped");
        const topResultCount = topResults.length;
        if (topResultCount === 1 && resultIndex === 0) return "";
        return subjects.find(s => s.ID === result.subjectID)!.title;
    }

    getResultText(result: VotingResult) {
        const translation = result.votes === 1 ? 
            this.translateService.instant("shared.components.display.it-result.vote") : 
            this.translateService.instant("shared.components.display.it-result.votes");
        return `${result.votes} ${translation}`;
    }

    hasResultSubText(card: Card, overrideAnonymous: boolean) {
        if (overrideAnonymous) return true;
        const votingCard = CardUtils.castCard<VotingCard>(card);
        if (votingCard.settings?.isAnonymous) return false
        return true;
    }

    getResultSubText(result: VotingResult, players: Player[]) {
        return Utils.addComaToStringArray(
            result.playerIDs
                .map(ID => players.find(p => p.id === ID)!.username),
            true
        );
    }
}