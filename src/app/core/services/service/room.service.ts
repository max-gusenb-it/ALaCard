import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../../state";
import { ItAuthenticateModal } from "src/app/shared/components/forms/it-authenticate-modal/it-authenticate-modal.component";
import { RoomServiceErrors } from "../../constants/errorCodes";
import { ItError } from "../../models/classes";
import { PopupService } from "./popup.service";
import { bufferTime, combineLatest, filter, firstValueFrom, map, of, take } from "rxjs";
import { RoomSourceService } from "../source/room.source.service";
import { Room } from "../../models/interfaces";
import { InformationState } from "../../state/information";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(
        private store: Store,
        private popupService: PopupService,
        private roomSourceService: RoomSourceService
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

    async getInitialRoom(roomId: string, creatorId: string) {
        return await firstValueFrom(
            this.roomSourceService.getRoom$(roomId, creatorId)
                .pipe(
                    // Wait for 1500 ms so actuall room settings are loaded and not cached value -> singleDeviceMode join bug
                    bufferTime(1500),
                    map(buffer => buffer.slice(-1)[0])
                )
            ).then(
                r => {
                    return r;
                },
                e => {
                    throw e;
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
}