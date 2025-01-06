import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { IngameDataDataService } from "../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../data/static-round-data.data.service";
import { ResponseDataDataService } from "../data/response-data.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";
import { CardService } from "./card/card.service";
import { Deck, GameSettings, Player, Round, StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataUtils } from "../../utils/static-round-data.utils";
import { Utils } from "../../utils/utils";

@Injectable({
    providedIn: 'root'
})
export class GameControlService {

    constructor(
        private store: Store,
        private ingameDataDataService: IngameDataDataService,
        private responseDataDataService: ResponseDataDataService,
        private staticRoundDataDataService: StaticRoundDataDataService,
        private cardService: CardService
    ) {
        this.responseDataDataService.getAdminResponses$()
            .subscribe(() => {
                const roomSettings = this.store.selectSnapshot(RoomState.roomSettings);
                if (!!roomSettings && roomSettings.autoContinueOnAllVotes) this.checkForAutoContinueRound();
            }
        );
    }
    
    createInitialStaticRoundData(deck: Deck, players: Player[], gameSettings: GameSettings) : StaticRoundData {
        let staticRoundData: StaticRoundData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            round: null,
            playedCardIndexes: [],
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            staticRoundData.round = this.createGameRound(deck, staticRoundData, players, gameSettings);
            staticRoundData.playedCardIndexes = [staticRoundData.round.cardIndex]
        }
        return staticRoundData;
    }

    createGameRound(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) : Round {
        const newCardIndex = this.getNewCardIndex(deck, staticRoundData, players, gameSettings);        
        
        const card = deck.cards[newCardIndex];
        const cardService = this.cardService.getCardService(card.type);
        
        return cardService.createGameRound(
            {
                id: staticRoundData.playedCardIndexes.length,
                cardIndex: newCardIndex
            },
            card,
            players,
            gameSettings
        );
    }
    
    private getNewCardIndex(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) {
        let availableCardIndexes = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i));

        availableCardIndexes = StaticRoundDataUtils.getPlayableCards(availableCardIndexes, deck, players.length, gameSettings);

        const orderCardIndexes = availableCardIndexes.filter(index => deck.cards[index].settings?.order !== undefined);
        if (orderCardIndexes.length !== 0) {
            return orderCardIndexes.map(i => { return {
                cardOrder: deck.cards[i].settings!.order!,
                index: i
            }}).sort((c1, c2) => c1.cardOrder - c2.cardOrder)[0].index;
        } else {
            return Utils.getNFromArray(availableCardIndexes, 1)[0];
        }
    }

    checkForAutoContinueRound() {
        const roundId = this.staticRoundDataDataService.getStaticRoundData()?.round?.id;
        if (!!!roundId && roundId !== 0) return;
        const activePlayerIds = this.ingameDataDataService.getActivePlayerIds();
        const responses = this.responseDataDataService.getAdminResponsesForRound(roundId);
        const responseCount = responses
            .filter(r => !!activePlayerIds.find(playerId => playerId === r.playerId))
            .length;
        if (responseCount >= activePlayerIds.length) {
            this.processRound(roundId);
        }
    }

    processRound(roundId: number) {
        const deck = this.store.selectSnapshot(RoomState.deck);
        const round = this.staticRoundDataDataService.getStaticRoundData()!.round!

        if (!!!round || !!!deck) return;
        const cardService = this.cardService.getCardService(deck.cards[round.cardIndex].type);

        const responses = this.responseDataDataService.getAdminResponsesForRound(roundId);

        const newDynamicRoundData = cardService.createDynamicRoundData(
            round.id,
            responses
        );
        const newPlayerData = this.ingameDataDataService.checkForInactivePlayers(responses);

        this.ingameDataDataService.updateIngameData(
            {
                ...this.ingameDataDataService.getIngameData(),
                dynamicRoundData: newDynamicRoundData,
                playerData: newPlayerData
            },
            this.store.selectSnapshot(RoomState.roomId)!
        );
    }

    startNewRound() {
        const staticRoundData = this.staticRoundDataDataService.getStaticRoundData();

        if (!!!staticRoundData) return;

        const round = this.createGameRound(
            this.store.selectSnapshot(RoomState.deck)!,
            staticRoundData,
            this.ingameDataDataService.getActivePlayers(),
            this.store.selectSnapshot(RoomState.gameSettings)!
        );

        return this.staticRoundDataDataService.updateStaticRoundData(
            {
                ...staticRoundData,
                round: round,
                playedCardIndexes: [
                    ...staticRoundData.playedCardIndexes,
                    round.cardIndex
                ]
            },
            this.store.selectSnapshot(RoomState.roomId)!
        );
    }

    getAdminResponseCountInfo(roundId: number) {
        const activePlayerIds = this.ingameDataDataService.getActivePlayerIds();
        const inactivePlayerResponseCount = this.responseDataDataService.getAdminResponsesForRound(roundId)
            .filter(r => activePlayerIds.findIndex(activePlayerId => activePlayerId === r.playerId) === -1)
            .length;
        return `${this.responseDataDataService.getAdminResponsesForRound(roundId).length} / ${this.ingameDataDataService.getActivePlayerIds().length + inactivePlayerResponseCount}`
    }
} 