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
    PlayerVotingCardService,
    QuizCardService,
    PollCardTranslationService
} from "@features";
import {
    Card,
    CardType,
    PollCard
} from "@shared";
import {  } from "./cards/player-voting-card.service";
import { QuizCardTranslationService } from "./cards/translation/quiz-card-translation.service";
import { PlayerVotingTranslationService } from "./cards/translation/player-voting-translation.service";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result>,
        private pollCardService: PollCardService<PollCard>,
        private playerVotingCardService: PlayerVotingCardService,
        private quizCardService: QuizCardService,
        private cardTranslationService: CardTranslationService,
        private pollCardTranslationService: PollCardTranslationService,
        private playerVotingCardTranslationService: PlayerVotingTranslationService,
        private quizCardTranslationService: QuizCardTranslationService
    ) { }

    getCardService(cardType?: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.Poll):
                return this.pollCardService;
            case(CardType.PlayerVoting):
                return this.playerVotingCardService;
            case(CardType.Quiz):
                return this.quizCardService;
            default:
                return this.cardService;
        }
    }

    getCardTranslationService(cardType?: CardType) : GameCardTranslationService  {
        switch(cardType) {
            case(CardType.Poll):
                return this.pollCardTranslationService;
            case(CardType.PlayerVoting):
                return this.playerVotingCardTranslationService;
            case(CardType.Quiz):
                return this.quizCardTranslationService;
            default:
                return this.cardTranslationService;
        }
    }
}