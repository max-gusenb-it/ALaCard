import firebase from 'firebase/compat/app';
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { ItAuthenticateModal } from "src/app/shared/components/forms/it-authenticate-modal/it-authenticate-modal.component";
import { RoomServiceErrors } from "../../constants/errorCodes";
import { ItError } from "../../models/classes";
import { PopupService } from "./popup.service";
import { combineLatest, filter, map, of, take } from "rxjs";
import { Player, Room } from "../../models/interfaces";
import { InformationState } from "../../state/information";
import { RoomUtils } from "../../utils/room.utils";
import { UserSourceService } from "../source/user.source.service";
import { IngameDataDataService } from '../data/ingame-data.data.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(
        private store: Store,
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
}