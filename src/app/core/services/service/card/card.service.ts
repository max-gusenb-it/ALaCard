import { Injectable } from "@angular/core";
import { CardType } from "src/app/core/models/enums";
import { BaseCardService } from "./base-card.service";
import { PlayerVotingCardService } from "./player-voting-card.service";
import { Card, DynamicRoundData, PlayerVotingCard, PollCard, Response, Result, ResultConfig } from "src/app/core/models/interfaces";
import { TopicVotingCardService } from "./topic-voting-card.service";
import { StaticRoundDataDataService } from "../../data/static-round-data.data.service";

export type GameCardService = BaseCardService<Card, Response, DynamicRoundData, Result, ResultConfig> | PlayerVotingCardService | TopicVotingCardService;
export type GameCard = Card | PlayerVotingCard | PollCard;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(
        private baseCardService: BaseCardService<Card, Response, DynamicRoundData, Result, ResultConfig>,
        private plaverVotingCardService: PlayerVotingCardService,
        private topicVotingCardService: TopicVotingCardService,
        private staticRoundDataDataServic: StaticRoundDataDataService
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

    getActiveCard(parentCard: Card) {
        const cardService = this.getCardService(parentCard.type);
        if (!cardService.hasFollowUpCard(parentCard) || this.staticRoundDataDataServic.followUpIndex === 0) {
            return parentCard;
        } else {
            if (cardService.hasDefaultFollowUpCard(parentCard) && this.staticRoundDataDataServic.followUpIndex === 1) {
                return parentCard
            } else {
                return parentCard.followUpCard!.card;
            }
        }
    }
}