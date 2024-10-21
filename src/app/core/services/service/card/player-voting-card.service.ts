import { PlayerVotingResponse } from "src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";
import { DynamicPlayerVotingRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-player-voting-round-data";
import { Card, DynamicRoundData, Player, PlayerVotingCard, PlayerVotingResult, Response, Result, SipResult } from "src/app/core/models/interfaces";
import { TranslateService } from "@ngx-translate/core";
import { defaultCardSips, defaultPayToDisplaySips } from "src/app/core/constants/card";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends CardService<PlayerVotingCard, PlayerVotingResponse, DynamicPlayerVotingRoundData, PlayerVotingResult> {
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
        results = results.sort((r1, r2) => {
            if (r1.votedPlayerId === null) return 1;
            if (r2.votedPlayerId === null) return 1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override getResultText(result: Result, translateService: TranslateService): string {
        const pvResult = this.castResult(result);
        const translation = pvResult.votes === 1 ? translateService.instant("shared.components.display.it-result.vote") : translateService.instant("shared.components.display.it-result.votes");
        return `${pvResult.votes} ${translation}`;
    }

    override cardHasResultSubText(card: Card, overwriteAnonymous: boolean = false): boolean {
        const pvCard = this.castCard(card);
        if (pvCard.settings?.isAnonymous && !overwriteAnonymous) return false;
        return true;
    }

    override getResultSubText(result: Result, players: Player[]): string {
        const pvResult = this.castResult(result);
        let text = "";
        pvResult.playerIds.forEach((playerId, index) => {
            text += players.find(p => p.id === playerId)!.username;
            if (index !== pvResult.playerIds.length -1) text += ", ";
        });
        return text;
    }

    override getSipResults(dynamicRoundData: DynamicRoundData): SipResult[] {
        const results = this.getResults(dynamicRoundData)
            .filter(r => r.votedPlayerId !== null);
        if (results.length === 0) return [];
        const topVotes = results[0].votes;
        let sipResults = results
            .filter(r => r.votes === topVotes)
            .map(r => {
                return {
                    playerId: r.votedPlayerId,
                    sips: defaultCardSips,
                    distribute: false
                } as SipResult
            }
        );
        const dynamicPlayerVotingRoundData = this.castDynamicRoundData(dynamicRoundData);
        if (!!dynamicPlayerVotingRoundData.payedToDisplayPlayerId) {
            const payToWinUserIndex = sipResults.findIndex(sr => sr.playerId === dynamicPlayerVotingRoundData.payedToDisplayPlayerId && !sr.distribute);
            if (payToWinUserIndex !== -1) {
                sipResults[payToWinUserIndex].sips += defaultPayToDisplaySips
            } else {
                sipResults = [
                    ...sipResults,
                    {
                        playerId: dynamicPlayerVotingRoundData.payedToDisplayPlayerId,
                        sips: defaultPayToDisplaySips,
                        distribute: false
                    }
                ]
            }
        }
        return sipResults;
    }
}

export const PVCardService = new PlayerVotingCardService();