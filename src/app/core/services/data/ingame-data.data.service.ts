import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map, takeUntil } from "rxjs";
import { IngameData, Response } from "../../models/interfaces";
import { IngameDataSourceService } from "../source/ingame-data.source.service";
import { RoomPlayerLoadBaseDataService } from "./room-player-load-base.data.service";
import { Store } from "@ngxs/store";
import { RoomState } from "../../state";
import { CardType } from "../../models/enums";
import { CardUtils } from "../../utils/card.utils";
import { CardService } from "../service/card/card.service";

@Injectable({
    providedIn: 'root'
})
export class IngameDataDataService extends RoomPlayerLoadBaseDataService {
    ingameData$: BehaviorSubject<IngameData> = new BehaviorSubject(null as any);

    constructor(
        private cardService: CardService,
        private ingameDataSourceService: IngameDataSourceService,
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

    processRound(roundId: number, cardType: CardType, responses: Response[]) {
        const cardService = this.cardService.getCardService(cardType);

        this.ingameDataSourceService.updateDynamicRoundData(
          this.store.selectSnapshot(RoomState.roomId)!,
          cardService.createDynamicRoundData(
            roundId, 
            responses
          )
        );
    }

    roundProcessed(roundId: number) {
        const ingameData = this.getIngameData();
        if (!!ingameData && !!ingameData.dynamicRoundData && ingameData.dynamicRoundData.roundId === roundId) return ingameData.dynamicRoundData.processed;
        else return false; 
    }
}