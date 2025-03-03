import { Injectable } from "@angular/core";
import { VotingCardTranslationService } from "@features";
import { PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardTranslationService extends VotingCardTranslationService<PollCard> {
}