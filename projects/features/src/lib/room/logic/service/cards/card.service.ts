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
    CardState,
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
    specificPlayerNameWhitecard
} from "@shared";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: 'root'
})
export class CardService<C extends Card, R extends Response, D extends DynamicRoundData, T extends Result> {
    constructor(
        protected store: Store,
        protected responseDataDataService: ResponseDataDataService,
        protected ingameDataDataService: IngameDataDataService,
        protected staticRoundDataDataService: StaticRoundDataDataService,
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
        switch(cardState) {
            case(CardState.Card_Initial): {
                const votingCard = this.castCard(card);
                const gameSettings = this.store.selectSnapshot(RoomState.gameSettings)!;
                const roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
                return votingCard.settings?.delaySipText === true && gameSettings?.drinkingGame && roomSettings.singleDeviceMode;
            };
            default: return Utils.isNumberDefined(card.followUpCardConfig?.followUpCardID);;
        }
    }

    getNextCardState() : string {
        return CardState.Card_SipText;
    }

    createDynamicRoundData(roundId: number, responses?: Response[]): D {
        return {
            roundId: roundId,
            processed: true
        } as D;
    }

    getRoundState(): RoundState {
        const roomSettings = this.store.selectSnapshot(RoomState.roomSettings);
        const roundInformation = this.store.selectSnapshot(InformationState.roundInformation);
        const dynamicRoundData = this.ingameDataDataService.getDynamicRoundData();
        const staticRoundData = this.staticRoundDataDataService.getStaticRoundData();
        if (
            roomSettings?.singleDeviceMode ||
            !this.responseDataDataService.userResponded(staticRoundData!.round!.id) &&
            (!!!roundInformation || roundInformation.roundId !== staticRoundData!.round!.id || !roundInformation.cardAnimationSkipped) &&
            (!!!dynamicRoundData || dynamicRoundData.roundId !== staticRoundData!.round!.id || !this.ingameDataDataService.roundProcessed(staticRoundData!.round!.id))
        ) {
            return RoundState.card;
        }
        if (!this.ingameDataDataService.roundProcessed(staticRoundData!.round!.id)) {
            return RoundState.form;
        }
        return RoundState.stats;
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
            if (s1.playerId === this.store.selectSnapshot(AuthenticationState.userId)) return -1;
            if (s2.playerId !== this.store.selectSnapshot(AuthenticationState.userId)) return 1;
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
        const players = this.store.selectSnapshot(RoomState.players);
        return players.find(p => p.id === result.playerId);
    }
}