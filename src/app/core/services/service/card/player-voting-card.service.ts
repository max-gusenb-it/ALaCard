import { PlayerVotingResponse } from "src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";
import { DynamicPlayerVotingRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-player-voting-round-data";
import { Response } from "src/app/core/models/interfaces";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends CardService<PlayerVotingResponse, DynamicPlayerVotingRoundData> {
    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPlayerVotingRoundData {
        const pvResponses = this.castResponses(responses);
        let drd : DynamicPlayerVotingRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }
}

export const PVCardService = new PlayerVotingCardService();