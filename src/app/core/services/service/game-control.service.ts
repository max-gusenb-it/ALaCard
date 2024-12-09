import { Injectable } from "@angular/core";
import { IngameDataDataService } from "../data/ingame-data.data.service";
import { StaticRoundDataDataService } from "../data/static-round-data.data.service";
import { ResponseDataDataService } from "../data/response-data.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";
import { CardService } from "./card/card.service";

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
                id: null as any,
                creationDate: null as any,
                dynamicRoundData: newDynamicRoundData,
                playerData: newPlayerData
            },
            this.store.selectSnapshot(RoomState.roomId)!
        );
    }

    startNewRound() {
        this.staticRoundDataDataService.startNewRound(this.ingameDataDataService.getActivePlayers());
    }

    getAdminResponseCountInfo(roundId: number) {
        const activePlayerIds = this.ingameDataDataService.getActivePlayerIds();
        const inactivePlayerResponseCount = this.responseDataDataService.getAdminResponsesForRound(roundId)
            .filter(r => activePlayerIds.findIndex(activePlayerId => activePlayerId === r.playerId) === -1)
            .length;
        return `${this.responseDataDataService.getAdminResponsesForRound(roundId).length} / ${this.ingameDataDataService.getActivePlayerIds().length + inactivePlayerResponseCount}`
    }
} 