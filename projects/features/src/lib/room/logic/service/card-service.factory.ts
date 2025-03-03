import { Injectable } from "@angular/core";
import {
    PlayerVotingCardService,
    CardService,
    TopicVotingCardService,
    DynamicRoundData,
    Response,
    GameCardService,
    PollCardService,
    Result,
    CardTranslationService,
    GameCardTranslationService,
} from "@features";
import {
    Card,
    CardType,
    TopicVotingCard
} from "@shared";
import { QuizCardService } from "./cards/quiz-card.service";
import { PollCardTranslationService } from "./cards/translation/poll-card-translation.service";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result>,
        private plaverVotingCardService: PlayerVotingCardService,
        private topicVotingCardService: TopicVotingCardService<TopicVotingCard>,
        private quizCardService: QuizCardService,
        private pollCardService: PollCardService,
        private cardTranslationService: CardTranslationService<Card>,
        private pollCardTranslationService: PollCardTranslationService
    ) { }

    getCardService(cardType?: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return this.plaverVotingCardService;
            }
            case(CardType.TopicVotingCard): {
                return this.topicVotingCardService;
            }
            case(CardType.QuizCard): {
                return this.quizCardService;
            }
            case(CardType.PollCard): {
                return this.pollCardService;
            }
            default: {
                return this.cardService;
            }
        }
    }

    getCardTranslationService<C extends Card>(cardType?: CardType) : GameCardTranslationService  {
        switch(cardType) {
            case(CardType.PollCard):
                return this.pollCardTranslationService;
            default:
                return this.cardTranslationService;
        }
    }
}