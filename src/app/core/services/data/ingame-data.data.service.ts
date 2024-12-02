import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, takeUntil } from "rxjs";
import { IngameData, PlayerData, Response } from "../../models/interfaces";
import { IngameDataSourceService } from "../source/ingame-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";
import { CardService } from "../service/card/card.service";
import { StaticRoundDataDataService } from "./static-round-data.data.service";

@Injectable({
    providedIn: 'root'
})
export class IngameDataDataService extends RoomPlayerLoadBaseDataService {
    ingameData$: BehaviorSubject<IngameData> = new BehaviorSubject(null as any);

    constructor(
        private cardService: CardService,
        private ingameDataSourceService: IngameDataSourceService,
        private staticRoundDataDataService: StaticRoundDataDataService,
        private store: Store
    ) {
        super();

        this.constructorDone$.next(true);
    }

    protected override disconnectFromData(): void {
        this.dataSubscription$.unsubscribe();
        this.ingameData$.next(null as any);
    }

    protected override connectToData(roomId: string): void {
        this.dataSubscription$ = this.ingameDataSourceService
            .getIngameData$(roomId)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(i => this.ingameData$.next(i));
    }

    getIngameData() {
        return this.ingameData$.value;
    }

    getIngameData$() {
        return this.ingameData$.asObservable();
    }

    getDynamicRoundData$() {
        return this.ingameData$.asObservable()
            .pipe(
                filter(d => !!d && !!d.dynamicRoundData),
                map(d => d.dynamicRoundData)
            );
    }

    processRound(responses: Response[]) {
        const players = this.store.selectSnapshot(RoomState.players);

        const round = this.staticRoundDataDataService.getStaticRoundData()?.round;
        const deck = this.store.selectSnapshot(RoomState.deck);
        if (!!!round || !!!deck) return;
        const cardService = this.cardService.getCardService(deck.cards[round.cardIndex].type);

        const newDynamicRoundData = cardService.createDynamicRoundData(
            round.id, 
            responses
        );

        let newPlayerData : PlayerData[] = responses
            .map(r => {
                return {
                    playerId: r.playerId,
                    inactiveRoundsCount: 0
                }
        });

        const unresponsivePlayerIds = players
            .filter(p => responses.map(r => r.playerId).findIndex(r => r === p.id) === -1)
            .map(p => p.id);
        
        unresponsivePlayerIds.forEach(playerId => {
            const existingPlayerData = this.ingameData$.value.playerData.find(pd => pd.playerId === playerId);
            let inactiveRoundsCount = 1;
            if (!!existingPlayerData && existingPlayerData.inactiveRoundsCount > 0) {
                inactiveRoundsCount = existingPlayerData.inactiveRoundsCount + 1;
            }
            newPlayerData.push({
                playerId: playerId,
                inactiveRoundsCount: inactiveRoundsCount
            });
        });

        this.ingameDataSourceService.updateIngameData(
            {
                ...this.ingameData$.value,
                dynamicRoundData: newDynamicRoundData,
                playerData: newPlayerData
            },
            this.store.selectSnapshot(RoomState.roomId)!
        );
    }

    roundProcessed(roundId: number) {
        const ingameData = this.getIngameData();
        if (!!ingameData && !!ingameData.dynamicRoundData && ingameData.dynamicRoundData.roundId === roundId) return ingameData.dynamicRoundData.processed;
        else return false; 
    }
}