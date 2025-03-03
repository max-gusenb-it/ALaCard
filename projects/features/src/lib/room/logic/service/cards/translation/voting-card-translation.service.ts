import { Injectable } from "@angular/core";
import { CardTranslationService, VotingResult } from "@features";
import { NewSubject, Utils, VotingCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class VotingCardTranslationService<C extends VotingCard> extends CardTranslationService<VotingCard> {
    getResultsHeading(subjects: NewSubject[], topResults: VotingResult[]) : string {
        if (topResults.length > 0) {
            return Utils.addComaToStringArray(
                topResults.map(r => subjects.find(s => r.subjectID === s.ID)!.title),
                    true
                );
        } else {
            return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
        }
    }

    getResultTitle(result: VotingResult, resultIndex: number, subjects: NewSubject[], topResults: VotingResult[]) : string {
        const topResultCount = topResults.length;
        if (topResultCount === 1 && resultIndex === 0) return "";
        return subjects.find(s => s.ID === result.subjectID)!.title;
    }
}