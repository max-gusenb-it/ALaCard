import { PlayerVotingResponse } from "src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends CardService<PlayerVotingResponse> { }

export const PVCardService = new PlayerVotingCardService();