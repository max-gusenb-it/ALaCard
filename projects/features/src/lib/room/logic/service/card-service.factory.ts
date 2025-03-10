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
    VotingCardTranslationService,
} from "@features";
import {
    Card,
    CardType,
    PollCard,
    TopicVotingCard
} from "@shared";
import { QuizCardService } from "./cards/quiz-card.service";
import { NewPlayerVotingCardService } from "./cards/new-player-voting-card.service";
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
        private votingCardTranslationService: VotingCardTranslationService<PollCard>,
        private newPlayerVotingCardService: NewPlayerVotingCardService,
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
            case(CardType.NewPlayerVotingCard): {
                return this.newPlayerVotingCardService;
            }
            default: {
                return this.cardService;
            }
        }
    }

    getCardTranslationService(cardType?: CardType) : GameCardTranslationService  {
        switch(cardType) {
            case(CardType.NewPlayerVotingCard):
                return this.votingCardTranslationService;
            case(CardType.PollCard):
                return this.pollCardTranslationService;
            default:
                return this.cardTranslationService;
        }
    }
}