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
    PopUpService,
    SharedErrors
} from '@shared';
import { 
    RoomService,
    Game, 
    GameSettings, 
    GameState,
    Player,
    Room,
    RoomSettings,
    RoomUtils,
    RoomActions,
    RoomConnectionData,
    RoomSourceService,
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
        private loadingHelperService: LoadingHelperService,
        private translateService: TranslateService,
        private store: Store,
        private zone: NgZone,
        private popUpService: PopUpService
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
            this.roomSourceService.createRoom(action.name, action.singleDeviceMode)
        ]).then(r => {
            return firstValueFrom(ctx.dispatch(new AuthenticationActions.SetUserRoomId(r[0].id!)));
        });
    }

    @Action(RoomActions.JoinRoom)
    async newJoinRoom(ctx: StateContext<RoomStateModel>, action: RoomActions.JoinRoom) {
        if (this.roomSubscription$ != null && !this.roomSubscription$.closed) {
            this.roomSubscription$.unsubscribe();
        }

        try {
            ctx.dispatch(new LoadingActions.StartLoading);

            let user = await this.roomService.checkIfUserExists();
            let initialRoom = await this.roomSourceService.getInitialRoom(action.roomId, action.creatorId);

            if (action.creatorId !== user.id) {
                // User tries to join a room of another user
                if (!navigator.onLine) {
                    // User is offline
                    throw new ItError(RoomStateErrors.joinRoomOffline, RoomState.name);
                }

                if (initialRoom.settings.singleDeviceMode) {
                    // Room is in single device mode
                    throw new ItError(RoomStateErrors.joinRoomInOffline, RoomState.name);
                }
            } else {
                if (!navigator.onLine && !action.singleDeviceMode) {
                    // If user is offline, ask him if eh really want to join in online mode
                    const continueOnlineJoin = await firstValueFrom(this.popUpService.openOptionBottomSheet(
                        this.translateService.instant("features.room.join-room-online-when-offline-bottom-sheet.title"),
                        this.translateService.instant("actions.cancel"),
                        this.translateService.instant("actions.join"),
                        this.translateService.instant("features.room.join-room-online-when-offline-bottom-sheet.subtitle")
                    ).closed) as boolean;
                    if (!continueOnlineJoin) {
                        throw new Error();
                    }
                }
            }

            if (action.creatorId !== user.id || !action.singleDeviceMode) {
                // Add user to room
                const newPlayer = RoomUtils.generatePlayerForRoom(initialRoom, user);
                let fieldData = {};
                if (initialRoom.settings.singleDeviceMode && user.id === action.creatorId) {
                    fieldData = {
                        "settings.singleDeviceMode": action.singleDeviceMode
                    };
                }
                if (newPlayer) {
                    fieldData = {
                        ...fieldData,
                        [`players.${user.id}`]: newPlayer
                    };
                }
                if (Object.keys(fieldData).length > 0) {
                    this.roomSourceService.updateRoomFields(
                        initialRoom.id!,
                        action.creatorId!,
                        fieldData
                    );
                }
            } else {
                // Convert room to single device mode
                const players = RoomUtils.mapPlayersToArray(initialRoom.players);
                if (
                    !initialRoom.settings.singleDeviceMode ||
                    players.length !== 1 && players[0].id !== user.id
                ) {
                    initialRoom.settings.singleDeviceMode = true;
                    this.roomSourceService.updateRoom(
                        RoomUtils.removePlayersFromRoom(initialRoom, user),
                        initialRoom.id!
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
        } catch (error) {
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

    @Action(RoomActions.SetGame)
    setGame(ctx: StateContext<RoomStateModel>, action: RoomActions.SetGame) {
        const state = ctx.getState();

        if (!!!state.room) {
            throw new ItError(
                RoomStateErrors.startGameReadRoomNotFound,
                RoomState.name
            )
        };

        this.roomSourceService.updateRoom(
            {
                ...state.room,
                game: action.game
            },
            state.room.id!,
        );
    }
}