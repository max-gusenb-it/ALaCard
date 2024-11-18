import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { playerNameWhitecard, specificPlayerNameWhitecard } from "src/app/core/constants/card";
import { PlayerState } from "src/app/core/models/enums";
import { Card, DynamicRoundData, GameSettings, Player, Response, Result, Round, SipResult } from "src/app/core/models/interfaces";
import { AuthenticationState, RoomState } from "src/app/core/state";
import { BaseCardUtils } from "src/app/core/utils/card/base-card.utils";
import { Utils } from "src/app/core/utils/utils";

@Injectable({
    providedIn: 'root'
})
export class BaseCardService<C extends Card, R extends Response, D extends DynamicRoundData, T extends Result> {

    constructor(private base_store: Store) { }

    createGameRound(baseRound: Round, card: Card, players: Player[], gameSettings: GameSettings) : Round {
        players = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline);

        let playerWhiteCardCount = Utils.countSubstrings(card.text, playerNameWhitecard);
        if (card.text.includes(specificPlayerNameWhitecard) && !!!gameSettings.speficiPlayerId) {
            playerWhiteCardCount = playerWhiteCardCount + 1;    
        }

        if (playerWhiteCardCount > 0) {
            baseRound.playerIds = Utils.getNFromArray(players.map(p => p.id), playerWhiteCardCount, !!gameSettings.speficiPlayerId ? [gameSettings.speficiPlayerId] : [])
        }
        return baseRound;
    }

    castCard(card: Card) : C {
        return BaseCardUtils.castCard<C>(card);
    }

    getCardText(card: Card, players: Player[], playerIds: string[] = [], speficPlayerId?: string) : string {
        let text = card.text;

        if (card.text.includes(specificPlayerNameWhitecard)) {
            if (!!speficPlayerId) {
                text = text.split(`${specificPlayerNameWhitecard}`).join(players.find(p => p.id === speficPlayerId)?.username);
            } else {
                text = text.replace(specificPlayerNameWhitecard, `${playerNameWhitecard}${playerIds.length - 1}`);
            }
        }
        
        if (playerIds.length > 0) {
            playerIds.forEach((playerId, index) => {
                text = text.split(`${playerNameWhitecard}${index}`).join(players.find(p => p.id === playerId)?.username);
            });
        }
        return text;
    }

    castResponse(response: Response | null) : R {
        return <R> response;
    }

    castResponses(responses: Response[]) : R[] {
        return <R[]> responses;
    }

    createDynamicRoundData(roundId: number, responses: Response[]) : D {
        return {
            roundId: roundId,
            processed: true
        } as D;
    }

    castDynamicRoundData(dynamicRoundData: DynamicRoundData) : D {
        return <D> dynamicRoundData;
    }

    castResult(result: Result) : T {
        return <T> result;
    }

    getResults(dynamicRoundData: DynamicRoundData) : T[] {
        return [];
    }

    getResultsHeading(results: Result[], card: Card) : string {
        return "";
    }

    getResultText(result: Result) {
        return "";
    }

    cardHasResultSubText(card: Card): boolean {
        return false;
    }

    getResultSubText(result: Result, players: Player[]) {
        return "";
    }

    getSperatedSipResults(card: Card, dynamicRoundData: DynamicRoundData) : [SipResult[], SipResult?] {
        const sipResults = this.calculateRoundSipResults(card, dynamicRoundData);
        const userSR = this.getUserSipResult(sipResults);
        return [sipResults.filter(s => s.playerId !== userSR?.playerId), userSR];
    }

    getUserSipResult(sipResults: SipResult[]) {
        return sipResults.find(s => s.playerId === this.base_store.selectSnapshot(AuthenticationState.userId));
    }
    
    /**
     * Calculates sip results for the essential part of the round
     *
     * @protected
     * @param {DynamicRoundData} dynamicRoundData
     * @returns {SipResult[]}
     */
    calculateRoundSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        return [];
    }

    getPlayerForSipResult(result: SipResult) {
        const players = this.base_store.selectSnapshot(RoomState.players);
        return players.find(p => p.id === result.playerId);
    }
}