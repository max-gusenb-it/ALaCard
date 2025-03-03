import { Injectable } from "@angular/core";
import { CardTranslationService } from "@features";
import { VotingCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class VotingCardTranslationService<C extends VotingCard> extends CardTranslationService<VotingCard> {
}