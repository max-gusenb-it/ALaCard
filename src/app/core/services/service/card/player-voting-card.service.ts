import { BaseCardService } from "./base-card.service";
import { Injectable } from "@angular/core";
import { DynamicPlayerVotingRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-player-voting-round-data";
import { Card, DynamicRoundData, Player, PlayerVotingCard, PlayerVotingResponse, PlayerVotingResult, PlayerVotingGroup, Response, Result, SipResult } from "src/app/core/models/interfaces";
import { TranslateService } from "@ngx-translate/core";
import { defaultCardSips, defaultPayToDisplaySips, playerVotingCardSkipValue } from "src/app/core/constants/card";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends BaseCardService<PlayerVotingCard, PlayerVotingResponse, DynamicPlayerVotingRoundData, PlayerVotingResult> {

    constructor(private translateService: TranslateService) {
        super();
    }

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
            if (r1.votedPlayerId === playerVotingCardSkipValue) return 1;
            if (r2.votedPlayerId === playerVotingCardSkipValue) return 1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override getResultText(result: Result): string {
        const pvResult = this.castResult(result);
        const translation = pvResult.votes === 1 ? this.translateService.instant("shared.components.display.it-result.vote") : this.translateService.instant("shared.components.display.it-result.votes");
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

    override getSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults: SipResult[] = this.calculateRoundSipResults(card, dynamicRoundData);
        // Pay To Disply Sip Calculation
        // Maybe move pay to display logic into seperate pay to display special card service
        const dynamicPlayerVotingRoundData = this.castDynamicRoundData(dynamicRoundData);
        if (!!dynamicPlayerVotingRoundData.payToDisplayPlayerId) {
            const payToWinUserIndex = sipResults.findIndex(sr => sr.playerId === dynamicPlayerVotingRoundData.payToDisplayPlayerId && !sr.distribute);
            if (payToWinUserIndex !== -1) {
                sipResults[payToWinUserIndex].sips += defaultPayToDisplaySips
            } else {
                sipResults = [
                    ...sipResults,
                    {
                        playerId: dynamicPlayerVotingRoundData.payToDisplayPlayerId,
                        sips: defaultPayToDisplaySips,
                        distribute: false
                    }
                ]
            }
        }
        return sipResults;
    }
    
    override calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const pvCard = this.castCard(card);

        const results = this.getResults(dynamicRoundData)
            .filter(r => r.votedPlayerId !== playerVotingCardSkipValue);
        let group = pvCard.settings?.sipConfig?.group;
        if (!!!group) group = PlayerVotingGroup.MostVoted;

        let sipResults: SipResult[] = [];
        if (results.length !== 0) {
            let votes = 0;
            if (group === PlayerVotingGroup.MostVoted) {
                votes = results[0].votes;
            } else {
                votes = results[results.length - 1].votes;
            }
            sipResults = results
                .filter(r => r.votes === votes)
                .map(r => {
                    return {
                        playerId: r.votedPlayerId,
                        sips: defaultCardSips,
                        distribute: false
                    } as SipResult
                }
            );
        };
        return sipResults;
    }

    getNewPayToDisplayPlayerId(oldDynamicRoundData: DynamicRoundData, newDynamicRoundData: DynamicRoundData) : string | undefined {
        if (!!!oldDynamicRoundData) return;
        const oldDRD = this.castDynamicRoundData(oldDynamicRoundData);
        const newDRD = this.castDynamicRoundData(newDynamicRoundData);
        if (!oldDRD.payToDisplayPlayerId && newDRD.payToDisplayPlayerId) {
            return newDRD.payToDisplayPlayerId;
        }
        return;
    }
}