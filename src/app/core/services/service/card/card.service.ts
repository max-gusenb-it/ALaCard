import { Injectable } from "@angular/core";
import { CardType } from "src/app/core/models/enums";
import { BaseCardService } from "./base-card.service";
import { PlayerVotingCardService } from "./player-voting-card.service";
import { Card, DynamicRoundData, PlayerVotingCard, PollCard, Response, Result, ResultConfig } from "src/app/core/models/interfaces";
import { TopicVotingCardService } from "./topic-voting-card.service";

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

    getCardService(cardType: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return this.plaverVotingCardService;
            }
            case(CardType.TopicVotingCard): {
                return this.topicVotingCardService;
            }
            default: return this.baseCardService;
        }
    }
}