import { DynamicRoundData, Result, TopicVotingCard, TopicVotingResponse } from "src/app/core/models/interfaces";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TopicVotingCardService extends CardService<TopicVotingCard, TopicVotingResponse, DynamicRoundData, Result> {

}