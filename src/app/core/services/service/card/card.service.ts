import { Injectable } from "@angular/core";
import { CardType } from "src/app/core/models/enums";
import { PollCardService } from "./poll-card.service";
import { BaseCardService } from "./base-card.service";
import { PlayerVotingCardService } from "./player-voting-card.service";
import { Card, DynamicRoundData, PlayerVotingCard, PollCard, Response, Result } from "src/app/core/models/interfaces";
import { TopicVotingCardService } from "./topic-voting-card.service";

export type GameCardService = BaseCardService<Card, Response, DynamicRoundData, Result> | PlayerVotingCardService | PollCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(
        private baseCardService: BaseCardService<Card, Response, DynamicRoundData, Result>,
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