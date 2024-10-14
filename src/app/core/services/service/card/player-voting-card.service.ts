import { PlayerVotingResponse } from "src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";
import { DynamicPlayerVotingRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-player-voting-round-data";
import { DynamicRoundData, PlayerVotingResult, Response, Result } from "src/app/core/models/interfaces";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends CardService<PlayerVotingResponse, DynamicPlayerVotingRoundData, PlayerVotingResult> {
    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicPlayerVotingRoundData {
        const pvResponses = this.castResponses(responses);
        let drd : DynamicPlayerVotingRoundData = super.createDynamicRoundData(roundId, responses);
        drd.responses = pvResponses;
        return drd;
    }

    override getResults(dynamicRoundData: DynamicRoundData): PlayerVotingResult[] {
        let results : PlayerVotingResult[] = [];
        const pvDynamicRoundData = this.castDynamicRoundData(dynamicRoundData);
        pvDynamicRoundData.responses.forEach(response => {
            let resultIndex = results.findIndex(r => r.votedPlayerId === response.votedPlayerId);
            if (resultIndex === -1) {
                results.push({
                    votedPlayerId: response.votedPlayerId,
                    playerIds: [response.playerId],
                    votes: 1
                })
            } else {
                const foundResults = results[resultIndex];
                results[resultIndex] = {
                    votedPlayerId: foundResults.votedPlayerId,
                    playerIds: [
                        ...foundResults.playerIds,
                        response.playerId
                    ],
                    votes: foundResults.votes + 1
                }
            }
        });
        return results;
    }

    override getResultText(result: Result, translateService: TranslateService): string {
        const pvResult = this.castResult(result);
        const translation = pvResult.votes === 1 ? translateService.instant("shared.components.display.it-result.vote") : translateService.instant("shared.components.display.it-result.votes");
        return `${pvResult.votes} ${translation}`;
    }
}

export const PVCardService = new PlayerVotingCardService();