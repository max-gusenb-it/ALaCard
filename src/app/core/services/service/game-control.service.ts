import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { IngameDataDataService } from "../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../data/static-round-data.data.service";
import { ResponseDataDataService } from "../data/response-data.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";
import { CardService, GameCardService } from "./card/card.service";
import { Card, Deck, GameSettings, Player, Round, StaticRoundData } from "../../models/interfaces";
import { StaticRoundDataUtils } from "../../utils/static-round-data.utils";
import { Utils } from "../../utils/utils";
import { CardStates } from '../../models/interfaces/logic/cards/card-states';

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
            followUpCardSchedules: []
        };
        if (!!!deck.groundRules || deck.groundRules.length === 0) {
            staticRoundData.round = this.createGameRound(deck, staticRoundData, players, gameSettings);
            staticRoundData.playedCardIndexes = [staticRoundData.round.cardIndex]
        }
        return staticRoundData;
    }

    createGameRound(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) : Round {
        const newRoundIndex = staticRoundData.playedCardIndexes.length;

        let cardService!: GameCardService;
        let newRound!: Round;
        let newCard!: Card;
        
        if (staticRoundData.followUpCardSchedules.length > 0 && Utils.isNumberDefined(staticRoundData.round?.id)) {
            const followUpCardSchedule = staticRoundData.followUpCardSchedules.find(f => f.scheduledRoundId <= newRoundIndex);
            if (!!followUpCardSchedule) {
                staticRoundData.followUpCardSchedules = staticRoundData.followUpCardSchedules.filter(fs => {
                    return (
                        fs.scheduledRoundId !== followUpCardSchedule.scheduledRoundId || 
                        fs.cardIndex !== followUpCardSchedule.cardIndex
                    );
                });
                newCard = deck.cards[followUpCardSchedule.cardIndex];
                cardService = this.cardService.getCardService(newCard.type);
                newRound = {
                    cardIndex: followUpCardSchedule.cardIndex,
                    id: newRoundIndex,
                    playerIds: followUpCardSchedule.sourceCardPlayerIds,
                    cardState: followUpCardSchedule.cardState
                };
            }
        }

        if (!newRound) {
            const newCardIndex = this.getNewCardIndex(deck, staticRoundData, players, gameSettings);        
            
            newCard = deck.cards[newCardIndex];
            cardService = this.cardService.getCardService(newCard.type);
            
            newRound = cardService.createGameRound(
                {
                    id: newRoundIndex,
                    cardIndex: newCardIndex,
                    cardState: CardStates.card_initial
                },
                newCard,
                players,
                gameSettings
            );
        }
        
        if (cardService.hasFollowUpCard(newCard!, newRound.cardState)) {
                staticRoundData.followUpCardSchedules = [
                {
                    cardIndex: Utils.isNumberDefined(newCard.followUpCardConfig?.followUpCardID) ? 
                        deck.cards.findIndex(c => c.followUpCardID === newCard.followUpCardConfig!.followUpCardID!) : 
                        newRound.cardIndex,
                    scheduledRoundId: newRound.id + (newCard.followUpCardConfig?.roundDelay ?? 1),
                    sourceCardPlayerIds: newRound.playerIds ?? [],
                    cardState: cardService.getNextCardState()
                },
                ...staticRoundData.followUpCardSchedules
            ]
        }

        return newRound;
    }
    
    private getNewCardIndex(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) {
        const childCardIndexes = deck.cards
            .filter(c => Utils.isNumberDefined(c.followUpCardID))
            .map(c => deck.cards.findIndex(card => card === c));

        let availableCardIndexes = Array.from(Array(deck.cards.length).keys())
            .filter(i => !staticRoundData.playedCardIndexes.includes(i))
            .filter(i => !childCardIndexes.includes(i));

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