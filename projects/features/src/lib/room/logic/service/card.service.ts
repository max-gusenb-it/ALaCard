import { Injectable } from "@angular/core";
import {
    PlayerVotingCardService,
    BaseCardService,
    TopicVotingCardService,
    DynamicRoundData,
    Response
} from "@features";
import {
    Card,
    PlayerVotingCard,
    PollCard,
    Result,
    ResultConfig,
    CardType
} from "@shared";

export type GameCardService = BaseCardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(
        private baseCardService: BaseCardService<Card, Response, DynamicRoundData, Result, ResultConfig>,
        private plaverVotingCardService: PlayerVotingCardService,
        private topicVotingCardService: TopicVotingCardService
    ) { }

    getCardService(cardType?: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return this.plaverVotingCardService;
            }
            case(CardType.TopicVotingCard): {
                return this.topicVotingCardService;
            }
            default: {
                return this.baseCardService;
            }
        }
    }
}