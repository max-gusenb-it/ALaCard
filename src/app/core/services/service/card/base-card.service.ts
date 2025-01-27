import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { playerNameWhitecard, specificPlayerNameWhitecard } from "src/app/core/constants/card";
import { PlayerState, RoundState } from "src/app/core/models/enums";
import { Card, DynamicRoundData, ResultConfig, GameSettings, Player, Response, Result, Round, SipResult, RoomSettings, StaticRoundData, RoundInformation } from "src/app/core/models/interfaces";
import { AuthenticationState, RoomState } from "src/app/core/state";
import { BaseCardUtils } from "src/app/core/utils/card/base-card.utils";
import { Utils } from "src/app/core/utils/utils";
import { ResponseDataDataService } from "../../data/response-data.data.service";
import { IngameDataDataService } from "../../data/ingame-data.data.service";
import { InformationState } from "src/app/core/state/information";
import { StaticRoundDataDataService } from "../../data/static-round-data.data.service";

@Injectable({
    providedIn: 'root'
})
export class BaseCardService<C extends Card, R extends Response, D extends DynamicRoundData, T extends Result, S extends ResultConfig> {

    constructor(
        private _store: Store,
        private _responseDataDataService: ResponseDataDataService,
        private _ingameDataDataService: IngameDataDataService,
        private _staticRoundDataDataService: StaticRoundDataDataService
    ) { }

    castCard(card: Card): C {
        return BaseCardUtils.castCard<C>(card);
    }

    castDynamicRoundData(dynamicRoundData: DynamicRoundData): D {
        return <D>dynamicRoundData;
    }

    castResponse(response: Response | null): R {
        return <R>response;
    }

    castResponses(responses: Response[]): R[] {
        return <R[]>responses;
    }

    castResult(result: Result): T {
        return <T>result;
    }

    getResults(dynamicRoundData: DynamicRoundData): T[] {
        return [];
    }

    createGameRound(baseRound: Round, card: Card, players: Player[], gameSettings: GameSettings): Round {
        players = players.filter(p => p.state === PlayerState.active || p.state === PlayerState.offline);

        let playerWhiteCardCount = Utils.countSubstrings(card.text, playerNameWhitecard);
        if (card.text.includes(specificPlayerNameWhitecard) && !gameSettings.speficiPlayerId) {
            playerWhiteCardCount = playerWhiteCardCount + 1;
        }

        if (playerWhiteCardCount > 0) {
            baseRound.playerIds = Utils.getNFromArray(players.map(p => p.id), playerWhiteCardCount, gameSettings.speficiPlayerId ? [gameSettings.speficiPlayerId] : [])
        }
        return baseRound;
    }

    hasFollowUpCard(card: Card) {
        return !!card.followUpCard;
    }

    createDynamicRoundData(roundId: number, responses: Response[]): D {
        return {
            roundId: roundId,
            processed: true
        } as D;
    }

    getRoundState(card: Card, activeSubCardIndex: number): RoundState {
        const roomSettings = this._store.selectSnapshot(RoomState.roomSettings);
        const roundInformation = this._store.selectSnapshot(InformationState.roundInformation);
        const dynamicRoundData = this._ingameDataDataService.getDynamicRoundData();
        const staticRoundData = this._staticRoundDataDataService.getStaticRoundData();
        if (
            roomSettings?.singleDeviceMode ||
            (this.isSplitCard(card) && activeSubCardIndex < this.getSubCardCount(card)) ||
            !this._responseDataDataService.userResponded(staticRoundData!.round!.id) &&
            (!!!roundInformation || roundInformation.roundId !== staticRoundData!.round!.id || roundInformation.activeSubCardIndex < 1) &&
            (!!!dynamicRoundData || dynamicRoundData.roundId !== staticRoundData!.round!.id || !dynamicRoundData.processed)
        ) {
            if (!this.isSplitCard(card)) {
                return RoundState.card;
            } else {
                return activeSubCardIndex % 2 === 1 ? RoundState.card : RoundState.cardHelper;
            }
        }
        if (!this._ingameDataDataService.roundProcessed(staticRoundData!.round!.id)) {
            return RoundState.form;
        }
        return RoundState.stats;
    }

    getCardText(card: Card, players: Player[], playerIds: string[] = [], speficPlayerId?: string): string {
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

    getOfflineCardText(card: Card, players: Player[], playerIds: string[] = [], speficPlayerId: string = "", gameSettings: GameSettings, activeSubCardIndex: number): string {
        let text = this.getCardText(card, players, playerIds, speficPlayerId);
        return text;
    }

    getOfflineCardTextSizeClass(card: Card, text: string): string {
        return "text-xl";
    }

    isSplitCard(card: Card): boolean {
        return false;
    }

    getSubCardCount(card: Card): number {
        return 1;
    }

    getResultsHeading(results: Result[], card: Card): string {
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

    getSperatedSipResults(card: Card, dynamicRoundData: DynamicRoundData): [SipResult[], SipResult?] {
        const sipResults = this.calculateRoundSipResults(card, dynamicRoundData);
        const userSR = this.getUserSipResult(sipResults);
        return [sipResults.filter(s => s.playerId !== userSR?.playerId), userSR];
    }

    
    /**
     * Calculates, formats and returns sip results.
     * If a user specific sip result is found, it is placed at the start of the result array
     *
     * @param {Card} card 
     * @param {DynamicRoundData} dynamicRoundData 
     * @returns {SipResult[]} 
     */
    getNewSeperatedSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults = this.calculateRoundSipResults(card, dynamicRoundData);
        const userSR = this.getUserSipResult(sipResults);
        if (!!userSR) {
            sipResults = [
                userSR,
                ...sipResults.filter(s => s.playerId !== userSR?.playerId)
            ]
        }
        return sipResults;
    }

    getUserSipResult(sipResults: SipResult[]) {
        return sipResults.find(s => s.playerId === this._store.selectSnapshot(AuthenticationState.userId));
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

    getResultGroup(dynamicRoundData: DynamicRoundData, resultConfig?: S): Result[] {
        return [];
    }

    getPlayerForSipResult(result: SipResult) {
        const players = this._store.selectSnapshot(RoomState.players);
        return players.find(p => p.id === result.playerId);
    }
}