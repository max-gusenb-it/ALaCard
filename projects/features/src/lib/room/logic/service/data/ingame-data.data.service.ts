import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, takeUntil } from "rxjs";
import { Store } from "@ngxs/store";
import { TranslateService } from "@ngx-translate/core";
import { 
    PopUpService,
    Utils
} from "@shared";
import { 
    RoomState,
    IngameData,
    PlayerData,
    Response,
    defaultInactiveRoundCount,
    RoomPlayerLoadBaseDataService,
    IngameDataSourceService
} from "@features";

@Injectable({
    providedIn: 'root'
})
export class IngameDataDataService extends RoomPlayerLoadBaseDataService {
    ingameData$: BehaviorSubject<IngameData> = new BehaviorSubject(null as any);

    constructor(
        private popUpService: PopUpService,
        private translateService: TranslateService,
        private ingameDataSourceService: IngameDataSourceService,
        private store: Store
    ) {
        super(store);

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

    updateIngameData(ingameData: IngameData, roomId: string) {
        this.ingameDataSourceService.updateIngameData(
            ingameData,
            roomId
        );
    }

    getIngameData() {
        return this.ingameData$.value;
    }

    getIngameData$() {
        return this.ingameData$.asObservable();
    }

    getDynamicRoundData() {
        return this.ingameData$?.value?.dynamicRoundData;
    }

    getDynamicRoundData$() {
        return this.ingameData$.asObservable()
            .pipe(
                filter(d => !!d && !!d.dynamicRoundData),
                map(d => d.dynamicRoundData)
            );
    }

    checkForInactivePlayers(responses: Response[]) {
        const players = this.store.selectSnapshot(RoomState.players);

        let responsivePlayerData: PlayerData[] = responses
            .map(r => {
                return {
                    playerId: r.playerId,
                    inactiveRoundsCount: 0
                }
            });
        let unresponsivePlayerData: PlayerData[] = [];

        const unresponsivePlayerIds = players
            .filter(p => responses.map(r => r.playerId).findIndex(r => r === p.id) === -1)
            .map(p => p.id);

        unresponsivePlayerIds.forEach(playerId => {
            const existingPlayerData = this.ingameData$.value.playerData.find(pd => pd.playerId === playerId);
            let inactiveRoundsCount = 1;
            if (!!existingPlayerData && existingPlayerData.inactiveRoundsCount > 0) {
                inactiveRoundsCount = existingPlayerData.inactiveRoundsCount + 1;
            }
            unresponsivePlayerData.push({
                playerId: playerId,
                inactiveRoundsCount: inactiveRoundsCount
            });
        });

        if (!!unresponsivePlayerData.find(pd => pd.inactiveRoundsCount === defaultInactiveRoundCount)) {
            const newInactivePlayers = players
                .filter(p => !!unresponsivePlayerData.find(pd => pd.playerId === p.id && pd.inactiveRoundsCount === defaultInactiveRoundCount));
            this.popUpService.openSnackbar(
                Utils.addComaToStringArray(
                    newInactivePlayers.map(p => p.username),
                    true
                ) + " " + (newInactivePlayers.length === 1 ? this.translateService.instant("features.room.game.has-been-set-to-inactive") : this.translateService.instant("features.room.game.have-been-set-to-inactive"))
            );
        }

        return [
            ...responsivePlayerData,
            ...unresponsivePlayerData
        ]
    }

    getActivePlayers() {
        const players = this.store.selectSnapshot(RoomState.players);
        return this.getActivePlayerIds()
            .map(pId => players.find(p => p.id === pId)!)
            .sort((p1, p2) => p1.joinOrder - p2.joinOrder);
    }

    getActivePlayerIds() {
        if (!!!this.ingameData$.value?.playerData || this.ingameData$.value.playerData.length === 0) return this.store.selectSnapshot(RoomState.players).map(p => p.id);
        const inactivePlayers = this.store.selectSnapshot(RoomState.inactivePlayers);
        return this.ingameData$.value.playerData
            .filter(pd => pd.inactiveRoundsCount < defaultInactiveRoundCount && inactivePlayers.findIndex(p => p.id === pd.playerId) === -1)
            .map(pd => pd.playerId);
    }

    roundProcessed(roundId: number) {
        const ingameData = this.getIngameData();
        if (!!ingameData && !!ingameData.dynamicRoundData && ingameData.dynamicRoundData.roundId === roundId) return ingameData.dynamicRoundData.processed;
        else return false;
    }
}