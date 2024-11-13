import { DynamicRoundData, Result, PollCard, PollResponse } from "src/app/core/models/interfaces";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PollCardService extends CardService<PollCard, PollResponse, DynamicRoundData, Result> {

}