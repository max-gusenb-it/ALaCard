import { Injectable } from "@angular/core";
import { IngameDataDataService } from "../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../data/static-round-data.data.service";
import { ResponseDataDataService } from "../data/response-data.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";

@Injectable({
    providedIn: 'root'
})
export class GameControlService {

    constructor(
        private store: Store,
        private ingameDataDataService: IngameDataDataService,
        private responseDataDataService: ResponseDataDataService,
        private staticRoundDataDataService: StaticRoundDataDataService
    ) {
        this.responseDataDataService.getAdminResponses$()
            .subscribe(() => {
                const roomSettings = this.store.selectSnapshot(RoomState.roomSettings);
                if (!!roomSettings && roomSettings.autoContinueOnAllVotes) this.checkForAutoContinueRound();
            }
        );
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
        this.ingameDataDataService.processRound(
            this.responseDataDataService.getAdminResponsesForRound(roundId),
            this.staticRoundDataDataService.getStaticRoundData()!.round!
        )
    }

    startNewRound() {
        this.staticRoundDataDataService.startNewRound(this.ingameDataDataService.getActivePlayers());
    }

    getAdminResponseCountInfo(roundId: number) {
        return `${this.responseDataDataService.getAdminResponsesForRound(roundId).length} / ${this.ingameDataDataService.getActivePlayerIds().length}`
    }
} 