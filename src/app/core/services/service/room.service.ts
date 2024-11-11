import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { AuthenticationState } from "../../state";
import { ItAuthenticateModal } from "src/app/shared/components/forms/it-authenticate-modal/it-authenticate-modal.component";
import { RoomServiceErrors } from "../../constants/errorCodes";
import { ItError } from "../../models/classes";
import { PopupService } from "./popup.service";

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    constructor(private store: Store, private popupService: PopupService) { }

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
}