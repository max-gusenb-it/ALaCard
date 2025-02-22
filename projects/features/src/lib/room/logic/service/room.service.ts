import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { combineLatest, filter, map, of, take } from "rxjs";
import { RoomState, ItAuthenticateModal, RoomUtils, Player, Room, IngameDataDataService, RoomSourceService } from '@features';
import { 
    AuthenticationState,
    InformationState,
    ItError,
    PlayerState,
    UserSourceService,
    RoomServiceErrors,
    PopupService
} from "@shared";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(
        private store: Store,
        private roomSourceService: RoomSourceService,
        private userSourceService: UserSourceService,
        private popupService: PopupService,
        private ingameDataDataService: IngameDataDataService
    ) { }

    async checkIfUserExists() {
        let user = this.store.selectSnapshot(AuthenticationState.user);
        if (!!!user) {
            const modal = await this.popupService.openModal({
                component: ItAuthenticateModal
            });
            await modal.onDidDismiss();
            user = this.store.selectSnapshot(AuthenticationState.user);
            if (!!!user) throw new ItError(RoomServiceErrors.joinRoomNoUser, RoomService.name);
        }
        return user;
    }

    checkForGameHistoryAddition(room: Room) {
        const user = this.store.selectSnapshot(AuthenticationState.user);
        let gameHistory = this.store.selectSnapshot(AuthenticationState.gameHistory);
        if (
            !!!room.game || 
            !!!room.game.deck || 
            !!!user || 
            !this.store.selectSnapshot(AuthenticationState.isAuthenticated) ||
            !!gameHistory.find(gh => gh.compareValue === room.game!.compareValue)
        ) return;

        const roomCreator = RoomUtils.getRoomCreator(room);
        gameHistory = [
            ...gameHistory,
            {
                compareValue: room.game.compareValue,
                roomCreatorUsername: roomCreator.username,
                roomCreatorId: roomCreator.id,
                roomId: room.id!,
                deckname: room.game.deck.name,
                icon: room.game.deck.icon,
                date: firebase.firestore.Timestamp.fromDate(new Date())
            }
        ];
        if (gameHistory.length > 3) {
            gameHistory = gameHistory.slice(-3);
        }
    
        this.userSourceService.updateUser(
            user.id!,
            {
                ...user,
                gameHistory: gameHistory
            }
        );
    }

    getRoomLoaded$(roomId: string, initialRoom: Room) {
        return combineLatest([
            this.store.select(RoomState.room)
                .pipe(
                    filter(room => !!room && !!room.id && room.id === roomId),
                    take(1)
                ),
            !!initialRoom.game 
                ? this.store.select(InformationState.gameInformation)
                    .pipe(
                        filter(g => g!.compareValue === initialRoom.game?.compareValue),
                        take(1)
                    ) 
                : of(null)
            ]
        ).pipe(
            take(1),
            map(() => true)
        );
    }

    getRoomAdmin() : Player {
        const room = this.store.selectSnapshot(RoomState.room);
        if (!!!room) throw new Error();
        return this.ingameDataDataService.getActivePlayers()[0];
    }

    isUserAdmin() {
        return this.store.selectSnapshot(AuthenticationState.user)?.id === this.getRoomAdmin()?.id;
    }

    kickPlayerFromRoom(playerId: string) {
        if (this.getRoomAdmin().id !== this.store.selectSnapshot(AuthenticationState.uid)) return;

        const room = this.store.selectSnapshot(RoomState.room);
        if (!!!room || !!!room.players[playerId]) return;

        let newRoom = {
            ...room,
            players: {...room.players}
        } as Room;
        if (!!!newRoom.players[playerId]) return;

        if (newRoom.players[playerId].state === PlayerState.offline) {
            const players = RoomUtils.mapPlayersToArray(newRoom.players);
            newRoom.players = RoomUtils.mapPlayersToObject(players.filter(p => p.id !== playerId));
        } else {
            let newPlayer = {
                ...newRoom.players[playerId]
            };
            
            newPlayer.state = PlayerState.left;
            newRoom.players[playerId] = newPlayer;
        }

        this.roomSourceService.updateRoom(newRoom, newRoom.id!);
    }
}