import { Injectable } from "@angular/core";
import { VotingCardTranslationService, VotingResult } from "@features";
import { PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService<PollCard> {
    override getResultsHeading(card: PollCard, topResults: VotingResult[]): string {
        return "Test Test test";
    }
}