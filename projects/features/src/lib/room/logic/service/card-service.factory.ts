import { Injectable } from "@angular/core";
import {
    CardService,
    DynamicRoundData,
    Response,
    GameCardService,
    PollCardService,
    Result,
    CardTranslationService,
    GameCardTranslationService,
    VotingCardTranslationService,
} from "@features";
import {
    Card,
    CardType,
    PollCard
} from "@shared";
import { NewPlayerVotingCardService } from "./cards/new-player-voting-card.service";
import { PollCardTranslationService } from "./cards/translation/poll-card-translation.service";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result>,
        private pollCardService: PollCardService,
        private newPlayerVotingCardService: NewPlayerVotingCardService,
        private cardTranslationService: CardTranslationService<Card>,
        private votingCardTranslationService: VotingCardTranslationService<PollCard>,
        private pollCardTranslationService: PollCardTranslationService
    ) { }

    getCardService(cardType?: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.Poll): {
                return this.pollCardService;
            }
            case(CardType.PlayerVoting): {
                return this.newPlayerVotingCardService;
            }
            default: {
                return this.cardService;
            }
        }
    }

    getCardTranslationService(cardType?: CardType) : GameCardTranslationService  {
        switch(cardType) {
            case(CardType.PlayerVoting):
                return this.votingCardTranslationService;
            case(CardType.Poll):
                return this.pollCardTranslationService;
            default:
                return this.cardTranslationService;
        }
    }
}