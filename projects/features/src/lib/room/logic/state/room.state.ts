import { Action, NgxsOnInit, Selector, State, StateContext, StateToken, Store } from "@ngxs/store";
import { Injectable, NgZone } from "@angular/core";
import { Subscription, firstValueFrom, takeUntil } from "rxjs";
import { NavController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { 
    AngularLifecycle, 
    AuthenticationActions, 
    AuthenticationState, 
    Deck, 
    ErrorMonitorActions, 
    InformationActions, 
    ItError, 
    LoadingActions, 
    LoadingHelperService, 
    PlayerState,
    PopupService,
    SharedErrors
} from '@shared';
import { 
    RoomService,
    Game, 
    GameSettings, 
    GameState,
    GameService,
    Player,
    Room,
    RoomSettings,
    RoomUtils,
    IngameDataUtils,
    RoomActions,
    RoomConnectionData,
    IngameDataSourceService, 
    ResponseDataSourceService,
    RoomSourceService,
    StaticRoundDataSourceService,
    RoomStateModel,
    RoomStateErrors
} from "@features";

export const ROOM_STATE_TOKEN = new StateToken<RoomStateModel>('room');

@State<RoomStateModel>({
    name: ROOM_STATE_TOKEN
})
@Injectable()
export class RoomState extends AngularLifecycle implements NgxsOnInit {
    roomSubscription$: Subscription = null as any;

    @Selector()
    static room(state: RoomStateModel): Room | null {
        return state.room;
    }

    @Selector()
    static roomId(state: RoomStateModel): string | undefined {
        return state.room?.id;
    }

    @Selector()
    static roomSettings(state: RoomStateModel): RoomSettings | undefined {
        return state.room?.settings;
    }

    @Selector()
    static singleDeviceModeActive(state: RoomStateModel): boolean {
        return state.room?.settings?.singleDeviceMode ?? false;
    }

    @Selector()
    static players(state: RoomStateModel): Player[] {
        if (!!!state.room) {
            return [];
        } else {
            return RoomUtils.mapPlayersToArray(state.room.players)
        }
    }

    @Selector()
    static inactivePlayers(state: RoomStateModel): Player[] {
        if (!!!state.room) {
            return [];
        } else {
            return RoomUtils.mapPlayersToArray(state.room.players)
                .filter(p => p.state === PlayerState.left)
        }
    }

    @Selector()
    static game(state: RoomStateModel): Game | undefined {
        const game = state.room?.game;
        return !!game ? game : undefined;
    }

    @Selector()
    static gameStarted(state: RoomStateModel): boolean {
        return state.room?.game?.state === GameState.started;
    }

    @Selector()
    static gameSettings(state: RoomStateModel): GameSettings | undefined {
        return state.room?.game?.settings;
    }

    @Selector()
    static deckname(state: RoomStateModel): string {
        return state.room?.game?.deck.name ?? "";
    }

    @Selector()
    static deck(state: RoomStateModel): Deck | undefined {
        return state.room?.game?.deck;
    }

    @Selector()
    static specificPlayerId(state: RoomStateModel): string | undefined {
        const id = state.room?.game?.settings.speficiPlayerId;
        return !!id ? id : undefined;
    }

    constructor(
        private roomService: RoomService,
        private navController: NavController,
        private roomSourceService: RoomSourceService,
        private ingameDataSourceService: IngameDataSourceService,
        private responseDataSourceService: ResponseDataSourceService,
        private gameService: GameService,
        private staticRoundDataSourceService: StaticRoundDataSourceService,
        private loadingHelperService: LoadingHelperService,
        private translateService: TranslateService,
        private store: Store,
        private zone: NgZone,
        private popupService: PopupService
    ) {
        super();
    }

    ngxsOnInit(ctx: StateContext<any>): void {
        this.store.select(AuthenticationState.isAuthenticated)
            .subscribe(isAutenticated => {
                if (!isAutenticated) {
                    ctx.patchState({
                        roomConnectionData: null,
                        room: null
                    });
                }
            });
    }

    @Action(RoomActions.CreateRoom)
    createRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.CreateRoom) {
        return this.loadingHelperService.loadWithLoadingState([
            this.roomSourceService.createRoom(action.name, action.description)
        ]).then(r => {
            return firstValueFrom(ctx.dispatch(new AuthenticationActions.SetUserRoomId(r[0].id!)));
        });
    }

    @Action(RoomActions.JoinRoom)
    async joinRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.JoinRoom) {
        if (this.roomSubscription$ != null && !this.roomSubscription$.closed) {
            // ask user if he wants to leave current room
            this.roomSubscription$.unsubscribe();
        }

        // check if user exists
        try {
            let user = await this.roomService.checkIfUserExists();

            ctx.dispatch(new LoadingActions.StartLoading);

            // If user is not online he can only join his own room 
            if (!navigator.onLine) {
                if (action.creatorId !== undefined && action.creatorId !== user.id) {
                    throw new ItError(RoomStateErrors.joinRoomOffline, RoomState.name);
                }
            }

            let initialRoom = await this.roomSourceService.getInitialRoom$(action.roomId, action.creatorId);

            // ToDo: Fix this bug
            if (!!!initialRoom) console.log ("Initial room load fail", initialRoom);
            if (RoomUtils.getRoomCreator(initialRoom).id !== user.id && initialRoom.settings.singleDeviceMode) {
                throw new ItError(RoomStateErrors.joinRoomInOffline, RoomState.name);
            }
            
            let joinOffline = false;
            if (!navigator.onLine && !initialRoom.settings.singleDeviceMode) {
                // If user is offline, ask him if eh wants to join his room in offline mode
                joinOffline = await firstValueFrom(this.popupService.openOptionBottomSheet(
                    this.translateService.instant("features.room.join-room-offline-bottom-sheet.title"),
                    this.translateService.instant("actions.cancel"),
                    this.translateService.instant("actions.join"),
                    this.translateService.instant("features.room.join-room-offline-bottom-sheet.subtitle")
                ).closed) as boolean;
                if (!joinOffline) {
                    throw new Error();
                }
            }

            if (joinOffline) {
                // Convert room to single device mode
                initialRoom.settings.singleDeviceMode = true;
                this.roomSourceService.updateRoom(
                    RoomUtils.removePlayersFromRoom(initialRoom, user),
                    initialRoom.id!
                );
            } else {
                // Add user to room
                const newPlayer = RoomUtils.generatePlayerForRoom(initialRoom, user);
                if (!!newPlayer) {
                    this.roomSourceService.upsertPlayer(
                        initialRoom.id!,
                        newPlayer.id,
                        newPlayer,
                        action.creatorId
                    );
                }
            }

            this.roomSubscription$ = this.roomSourceService.getRoom$(action.roomId, action.creatorId)
                .pipe(
                    takeUntil(this.destroyed$)
                )
                .subscribe(r => {
                    this.roomService.checkForGameHistoryAddition(r);

                    ctx.dispatch(new RoomActions.SetRoom(action.creatorId, r));
            });
            
            if (!!initialRoom.game?.compareValue) {
                this.store.dispatch(new InformationActions.SetGameInformation({
                    compareValue: initialRoom.game.compareValue,
                    rulesReadSend: false,
                    gameRulesCardIndex:  0,
                    roundInformation: undefined
                }));
            }

            this.roomService.getRoomLoaded$(action.roomId, initialRoom)
                .subscribe(() => {
                    ctx.dispatch(new LoadingActions.EndLoading());
                });
            
            return Promise.resolve();
        } catch(error) {
            ctx.dispatch(new LoadingActions.EndLoading);
            if (error instanceof ItError) {
                ctx.dispatch(new ErrorMonitorActions.SetError(error.exportError()));
            } else {
                console.error(error);
                ctx.dispatch(
                    new ErrorMonitorActions.SetError({
                        code: SharedErrors.unknownError,
                        location: RoomState.name
                    })
                );
            }
            this.navController.navigateBack('home');
            return;
        }
    }

    @Action(RoomActions.SetRoom)
    setRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.SetRoom) {
        try {
            const user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!action.room && (!!!user || !!!action.room.players[user.id!] || action.room.players[user.id!].state >= PlayerState.left)) {
                throw new ItError(RoomStateErrors.setRoomUserNotFound, RoomState.name);
            }

            let connectionData: RoomConnectionData | null = null;

            if (!!action.room) {
                connectionData = {
                    creatorId: action.creatorId!,
                    roomId: action.room.id!
                }
            }
    
            ctx.patchState({
                roomConnectionData: connectionData,
                room: action.room
            });
        } catch (error) {
            if (!!this.roomSubscription$ && !this.roomSubscription$.closed) this.roomSubscription$.unsubscribe();
            if (error instanceof ItError) {
                ctx.dispatch(new ErrorMonitorActions.SetError(error.exportError()));
            } else {
                console.error(error);
                ctx.dispatch(
                    new ErrorMonitorActions.SetError({
                        code: SharedErrors.unknownError,
                        location: RoomState.name
                    })
                );
            }
            this.navController.navigateBack('home');
            return;
        }
    }

    @Action(RoomActions.AddOfflinePlayer)
    addOfflinePlayer(ctx: StateContext<RoomStateModel>, action: RoomActions.AddOfflinePlayer) {
        const state = ctx.getState();
        if (!!!state.room) return;

        const newPlayer = RoomUtils.generateOfflinePlayerForRoom(state.room, action.playerName);

        this.roomSourceService.upsertPlayer(
            state.room.id!,
            newPlayer.id,
            newPlayer
        );
    }

    @Action(RoomActions.LeaveRoom)
    leaveRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.LeaveRoom) {
        const state = ctx.getState();
        if (!!!state.room) return;

        if (this.roomSubscription$ == null || this.roomSubscription$.closed) {
            this.navController.navigateBack("home");
            return Promise.resolve();
        }

        const userId = this.store.selectSnapshot(AuthenticationState.user)?.id!;
        const player = RoomUtils.generateLeftPlayer(state.room, userId);
        if (!!!player) {
            return;
        }
        
        this.loadingHelperService.loadWithLoadingState([this.roomSourceService.upsertPlayer(state.room.id!, userId, player)]);
        this.roomSubscription$.unsubscribe();
        ctx.dispatch(new RoomActions.SetRoom(null, null));
        // zone wrap to prevent -> "Navigation triggered outside Angular zone"
        this.zone.run(() => {
            this.navController.navigateBack("home");
        });
        ctx.dispatch(new LoadingActions.EndLoading);
        return;
    }

    @Action(RoomActions.StartGame)
    startGame(ctx: StateContext<RoomStateModel>, action: RoomActions.StartGame) {
        const state = ctx.getState();

        if (!!!state.room) {
            throw new ItError(
                RoomStateErrors.startGameReadRoomNotFound,
                RoomState.name
            )
        };

        const compareValue = new Date().valueOf();

        this.store.dispatch(new InformationActions.SetGameInformation({
            compareValue: compareValue,
            rulesReadSend: false,
            gameRulesCardIndex:  0,
            roundInformation: undefined
        }));
        
        return this.loadingHelperService.loadWithLoadingState([
            this.roomSourceService.updateRoom(
                {
                    ...state.room,
                    game: {
                        compareValue: compareValue,
                        state: GameState.started,
                        deck: action.deck,
                        settings: action.gameSettings
                    }
                },
                state.room.id!,
            ),
            this.ingameDataSourceService.createIngameData(
                IngameDataUtils.createInitialIngameData(),
                state.room.id!
            ),
            this.responseDataSourceService.createInitialResponseData(state.room.id!),
            this.staticRoundDataSourceService.createStaticRoundData(
                this.gameService.createInitialStaticRoundData(
                    action.deck,
                    RoomUtils.mapPlayersToArray(state.room.players),
                    action.gameSettings
                ),
                state.room.id!,
            )
        ]);
    }

    @Action(RoomActions.ContinueToGame)
    continueToGame(ctx: StateContext<RoomStateModel>, action: RoomActions.ContinueToGame) {
        const state = ctx.getState();

        if (!!!state.room?.game) {
            throw new ItError(
                RoomStateErrors.continueToGameReadGameNotFound,
                RoomState.name
            )
        };

        const round = this.gameService.createGameRound(
            state.room.game!.deck,
            action.staticRoundData,
            RoomUtils.mapPlayersToArray(state.room.players),
            state.room.game!.settings
        );

        this.staticRoundDataSourceService.updateStaticRoundData(
            {
                ...action.staticRoundData,
                round: round,
                playedCardIndexes: [round.cardIndex]
            },
            state.room.id!
        )
    }

    @Action(RoomActions.EndGame)
    endGame(ctx: StateContext<RoomStateModel>, action: RoomActions.EndGame) {
        const state = ctx.getState();

        if (!!!state.room?.game) {
            throw new ItError(
                RoomStateErrors.endGameReadGameNotFound,
                RoomState.name
            )
        };

        this.roomSourceService.updateRoom(
            {
                ...state.room,
                game: null
            },
            state.room.id!
        )
    }
}