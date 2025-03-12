import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import {
    Player,
    DynamicRoundData,
    GameSettings,
    RoomState,
    CardUtils,
    Round,
    RoundState,
    CardStates,
    Response,
    Result,
    SipResult,
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService
} from "@features";
import {
    AuthenticationState,
    Card,
    InformationState,
    PlayerState,
    Utils,
    playerNameWhitecard,
    specificPlayerNameWhitecard,
    CardType
} from "@shared";
import { TranslateService } from "@ngx-translate/core";

// ToDo - structure: remove resultsConfig

@Injectable({
    providedIn: 'root'
})
export class CardService<C extends Card, R extends Response, D extends DynamicRoundData, T extends Result> {

    // ToDo - structure: fix
    constructor(
        private _store: Store,
        private _responseDataDataService: ResponseDataDataService,
        private _ingameDataDataService: IngameDataDataService,
        private _staticRoundDataDataService: StaticRoundDataDataService,
        protected translateService: TranslateService
    ) { }

    castCard(card: Card): C {
        return CardUtils.castCard<C>(card);
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

    getResults(dynamicRoundData: DynamicRoundData, card?: Card): T[] {
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

    hasFollowUpCard(card: Card, cardState: string) {
        return Utils.isNumberDefined(card.followUpCardConfig?.followUpCardID);
    }

    hasDefaultFollowUpCard(card: Card) {
        return false;
    }

    getNextCardState() : string{
        return CardStates.card_initial;
    }

    createDynamicRoundData(roundId: number, responses?: Response[]): D {
        return {
            roundId: roundId,
            processed: true
        } as D;
    }

    getRoundState(): RoundState {
        const roomSettings = this._store.selectSnapshot(RoomState.roomSettings);
        const roundInformation = this._store.selectSnapshot(InformationState.roundInformation);
        const dynamicRoundData = this._ingameDataDataService.getDynamicRoundData();
        const staticRoundData = this._staticRoundDataDataService.getStaticRoundData();
        if (
            roomSettings?.singleDeviceMode ||
            !this._responseDataDataService.userResponded(staticRoundData!.round!.id) &&
            (!!!roundInformation || roundInformation.roundId !== staticRoundData!.round!.id || !roundInformation.cardAnimationSkipped) &&
            (!!!dynamicRoundData || dynamicRoundData.roundId !== staticRoundData!.round!.id || !this._ingameDataDataService.roundProcessed(staticRoundData!.round!.id))
        ) {
            return RoundState.card;
        }
        if (!this._ingameDataDataService.roundProcessed(staticRoundData!.round!.id)) {
            return RoundState.form;
        }
        return RoundState.stats;
    }

    getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customTitle))
            return card.settings!.customTitle;
        switch(card.type) {
            case(CardType.GroundRule):
                return this.translateService.instant("features.room.game.card.groundRules");
            case(CardType.FreeText):
                return this.translateService.instant("features.room.game.card.freeText")
            case(CardType.QuizCard):
                return this.translateService.instant("features.room.game.card.quiz")
        }
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

    getOfflineCardText(card: Card, players: Player[], playerIds: string[] = [], speficPlayerId: string = "", gameSettings: GameSettings): string {
        let text = this.getCardText(card, players, playerIds, speficPlayerId);
        return text;
    }

    getOfflineCardTextSizeClass(card: Card, text: string): string {
        return "text-xl";
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
    
    /**
     * Calculates, formats and returns sip results.
     * If a user specific sip result is found, it is placed at the start of the result array
     *
     * @param {Card} card 
     * @param {DynamicRoundData} dynamicRoundData 
     * @returns {SipResult[]} 
     */
    getSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults = this.calculateSipResults(card, dynamicRoundData);
        return sipResults.sort((s1, s2) => {
            if (s1.playerId === this._store.selectSnapshot(AuthenticationState.userId)) return -1;
            if (s2.playerId !== this._store.selectSnapshot(AuthenticationState.userId)) return 1;
            return 0;
        });
    }

    /**
     * Calculates sip results for the essential part of the round
     *
     * @protected
     * @param {DynamicRoundData} dynamicRoundData
     * @returns {SipResult[]}
     */
    calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        return [];
    }

    getPlayerForSipResult(result: SipResult) {
        const players = this._store.selectSnapshot(RoomState.players);
        return players.find(p => p.id === result.playerId);
    }
}