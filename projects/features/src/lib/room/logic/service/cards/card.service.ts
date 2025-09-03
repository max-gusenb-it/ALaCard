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
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService
} from "@features";
import {
    Card,
    CardType,
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

    getNextCardState(card: Card, cardState: string, gameSettings: GameSettings) : string | undefined {
        switch(cardState) {
            case(CardState.Card_Initial):
            case(CardState.Card_FollowUp_Initial): {
                const roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
                if (
                    card.settings?.delaySipText === true && 
                    gameSettings?.drinkingGame && 
                    (roomSettings.singleDeviceMode || card.type === CardType.FreeText)
                ) {
                    return CardState.Card_SipText;
                } else if (Utils.isNumberDefined(card.settings?.followUpCardConfig?.followUpCardID)) {
                    return CardState.Card_FollowUp_Initial;
                }
                return;
            };
        }
        if (Utils.isNumberDefined(card.settings?.followUpCardConfig?.followUpCardID)) {
            return CardState.Card_FollowUp_Initial;
        }
        return;
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
}