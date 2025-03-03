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
} from "@features";
import {
    Card,
    CardType,
    TopicVotingCard
} from "@shared";
import { QuizCardService } from "./cards/quiz-card.service";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result>,
        private plaverVotingCardService: PlayerVotingCardService,
        private topicVotingCardService: TopicVotingCardService<TopicVotingCard>,
        private quizCardService: QuizCardService,
        private pollCardService: PollCardService
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
}