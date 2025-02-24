import { Injectable } from "@angular/core";
import {
    PlayerVotingCardService,
    CardService,
    TopicVotingCardService,
    DynamicRoundData,
    Response,
    GameCardService,
} from "@features";
import {
    Card,
    CardType,
    TopicVotingCard,
    Result,
    ResultConfig,
    TopicVotingCardResultConfig
} from "@shared";
import { QuizCardService } from "./cards/quiz-card.service";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result, ResultConfig>,
        private plaverVotingCardService: PlayerVotingCardService,
        private topicVotingCardService: TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig>,
        private quizCardService: QuizCardService
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
            default: {
                return this.cardService;
            }
        }
    }
}