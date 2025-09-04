import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { 
    Player,
    CardState,
    RoomState,
    CardServiceFactory,
    GameSettings,
    Round,
    StaticRoundData,
    IngameDataDataService,
    ResponseDataDataService,
    StaticRoundDataDataService,
    GameServiceErros,
    StaticRoundDataUtils,
    StaticRoundDataSourceService,
    IngameDataSourceService,
    ResponseDataSourceService,
    IngameDataUtils,
    RoomUtils,
    RoomStateErrors,
    RoomActions,
    GameState
} from '@features';
import { 
    Card,
    Deck,
    ErrorMonitorActions,
    ItError,
    Utils,
    CardType,
    InformationActions,
    LoadingHelperService
} from '@shared';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    constructor(
        private store: Store,
        private loadingHelperService: LoadingHelperService,
        private ingameDataDataService: IngameDataDataService,
        private responseDataDataService: ResponseDataDataService,
        private staticRoundDataDataService: StaticRoundDataDataService,
        private staticRoundDataSourceService: StaticRoundDataSourceService,
        private ingameDataSourceService: IngameDataSourceService,
        private responseDataSourceService: ResponseDataSourceService,
        private cardServiceFactory: CardServiceFactory
    ) {
        this.responseDataDataService.getAdminResponses$()
            .subscribe(() => {
                const roomSettings = this.store.selectSnapshot(RoomState.roomSettings);
                if (!!roomSettings && roomSettings.autoContinueOnAllVotes) this.checkForAutoContinueRound();
            }
        );
    }

    startGame(deck: Deck, gameSettings: GameSettings) {
        const compareValue = new Date().valueOf();
        
        this.store.dispatch(new InformationActions.SetGameInformation({
            compareValue: compareValue,
            rulesReadSend: false,
            gameRulesCardIndex:  0,
            roundInformation: undefined
        }));

        const room = this.store.selectSnapshot(RoomState.room);

        if (!!!room) {
            // ToDo: Fix errors
            throw new ItError(
                RoomStateErrors.startGameReadRoomNotFound,
                RoomState.name,
                this.startGame.name
            )
        };
                
        return this.loadingHelperService.loadWithLoadingState([
            this.ingameDataSourceService.createIngameData(
                IngameDataUtils.createInitialIngameData(),
                room.id!
            ),
            this.responseDataSourceService.createInitialResponseData(room.id!),
            this.staticRoundDataSourceService.createStaticRoundData(
                this.createInitialStaticRoundData(
                    deck,
                    RoomUtils.mapPlayersToArray(room!.players),
                    gameSettings
                ),
                room!.id!,
            )
        ]).then(() => {
            return this.store.dispatch(new RoomActions.SetGame(
                {
                    compareValue: compareValue,
                    state: GameState.started,
                    deck: deck,
                    settings: gameSettings
                }
            ));
        });
    }

    continueToGame() {
        const room = this.store.selectSnapshot(RoomState.room);

        if (!!!room) {
            throw new ItError(
                RoomStateErrors.startGameReadRoomNotFound,
                RoomState.name,
                this.startGame.name
            )
        };

        const staticRoundData = this.staticRoundDataDataService.getStaticRoundData();

        if (!!!staticRoundData) return;

        const round = this.createGameRound(
            room.game!.deck,
            staticRoundData,
            RoomUtils.mapPlayersToArray(room.players),
            room.game!.settings
        );

        this.staticRoundDataSourceService.updateStaticRoundData(
            {
                ...staticRoundData,
                round: round,
                playedCardIndexes: [round.cardIndex]
            },
            room.id!
        )
    }

    getCardService(cardType: CardType) {
        return this.cardServiceFactory.getCardService(cardType);
    }
    
    createInitialStaticRoundData(deck: Deck, players: Player[], gameSettings: GameSettings) : StaticRoundData {
        let staticRoundData: StaticRoundData = {
            creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
            round: null,
            playedCardIndexes: [],
            followUpCardSchedules: []
        };
        let rulesExist = false;
        if (gameSettings.drinkingGame) {
            rulesExist = !!deck.groundRules && deck.groundRules.length > 0;
        } else {
            rulesExist = !!deck.groundRules?.find(r => !r.drinkingRule);
        }
        if (!rulesExist) {
            staticRoundData.round = this.createGameRound(deck, staticRoundData, players, gameSettings);
            staticRoundData.playedCardIndexes = [staticRoundData.round.cardIndex]
        }
        return staticRoundData;
    }

    createGameRound(deck: Deck, staticRoundData: StaticRoundData, players: Player[], gameSettings: GameSettings) : Round {
        const newRoundIndex = staticRoundData.playedCardIndexes.length;

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
            if (!Utils.isNumberDefined(newCardIndex)) {
                throw new ItError(
                    GameServiceErros.noCardsLeft,
                    GameService.name
                )
            }
            
            newCard = deck.cards[newCardIndex];
            
            newRound = this.getCardService(newCard.type).createGameRound(
                {
                    id: newRoundIndex,
                    cardIndex: newCardIndex,
                    cardState: CardState.Card_Initial
                },
                newCard,
                players,
                gameSettings
            );
        }
        
        const newCardState = this.getCardService(newCard.type).getNextCardState(newCard, newRound.cardState, gameSettings);
        if (Utils.isStringDefinedAndNotEmpty(newCardState)) {
            staticRoundData.followUpCardSchedules = [
                {
                    cardIndex: newCardState !== CardState.Card_FollowUp_Initial ? 
                        newRound.cardIndex :
                        deck.cards.findIndex(c => c.followUpCardID === newCard.settings!.followUpCardConfig!.followUpCardID!),
                    scheduledRoundId: newRound.id + (newCard.settings?.followUpCardConfig?.roundDelay ?? 1),
                    sourceCardPlayerIds: newRound.playerIds ?? [],
                    cardState: newCardState!
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
        if ((!!!roundId && roundId !== 0) || this.ingameDataDataService.roundProcessed(roundId)) return;
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

        const responses = this.responseDataDataService.getAdminResponsesForRound(roundId);
        const newDynamicRoundData = this.getCardService(deck.cards[round.cardIndex].type).createDynamicRoundData(
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

        try {
            const round = this.createGameRound(
                this.store.selectSnapshot(RoomState.deck)!,
                staticRoundData,
                this.ingameDataDataService.getActivePlayers(),
                this.store.selectSnapshot(RoomState.gameSettings)!
            );

             this.staticRoundDataDataService.updateStaticRoundData(
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
        } catch (error) {
            if (error instanceof ItError) {
                this.store.dispatch(new ErrorMonitorActions.SetError(error.exportError()))
            }
        }
    }

    getAdminResponseCountInfo(roundId: number) {
        const activePlayerIds = this.ingameDataDataService.getActivePlayerIds();
        const inactivePlayerResponseCount = this.responseDataDataService.getAdminResponsesForRound(roundId)
            .filter(r => activePlayerIds.findIndex(activePlayerId => activePlayerId === r.playerId) === -1)
            .length;
        return `${this.responseDataDataService.getAdminResponsesForRound(roundId).length} / ${this.ingameDataDataService.getActivePlayerIds().length + inactivePlayerResponseCount}`
    }
} 