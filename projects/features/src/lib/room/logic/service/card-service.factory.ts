import { Injectable } from "@angular/core";
import {
    PlayerVotingCardService,
    CardService,
    TopicVotingCardService,
    DynamicRoundData,
    Response,
    Result,
    ResultConfig,
    GameCardService
} from "@features";
import {
    Card,
    CardType
} from "@shared";

@Injectable({
    providedIn: 'root'
})
export class CardServiceFactory {
    constructor(
        private cardService: CardService<Card, Response, DynamicRoundData, Result, ResultConfig>,
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
                return this.cardService;
            }
        }
    }
}