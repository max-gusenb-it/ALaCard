import { Injectable } from "@angular/core";
import { CardType } from "src/app/core/models/enums";
import { PollCardService } from "./poll-card.service";
import { BaseCardService } from "./base-card.service";
import { PlayerVotingCardService } from "./player-voting-card.service";
import { Card, DynamicRoundData, Response, Result } from "src/app/core/models/interfaces";

export type GameCardService = BaseCardService<Card, Response, DynamicRoundData, Result> | PlayerVotingCardService | PollCardService;

@Injectable({
    providedIn: 'root'
})
export class CardService {
    constructor(
        private baseCardService: BaseCardService<Card, Response, DynamicRoundData, Result>,
        private plaverVotingCardService: PlayerVotingCardService,
        private pollCardService: PollCardService
    ) { }

    getCardService(cardType: CardType) : GameCardService {
        switch(cardType) {
            case(CardType.PlayerVoting): {
                return this.plaverVotingCardService;
            }
            case(CardType.TopicVotingCard): {
                return this.pollCardService;
            }
            default: return this.baseCardService;
        }
    }

    // ToDo: Make card Service methods callable from here for easier use
}