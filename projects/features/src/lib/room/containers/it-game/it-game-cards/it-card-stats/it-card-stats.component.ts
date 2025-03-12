import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import {
  RoomState,
  DynamicRoundData,
  GameSettings,
  StaticRoundData,
  IngameDataDataService,
  StaticRoundDataDataService
} from '@features';
import { 
  AngularLifecycle,
  CardType,
  Deck
} from '@shared';

@Component({
  selector: 'it-card-stats',
  templateUrl: './it-card-stats.component.html',
})
export class ItCardStatsComponent extends AngularLifecycle {

  get cardType() {
    return CardType;
  }

  deck: Deck;
  staticRoundData: StaticRoundData;
  dynamicRoundData: DynamicRoundData;
  @Select(RoomState.gameSettings) gameSettings$: Observable<GameSettings>;

  constructor(
    private store: Store,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private ingameDataDataService: IngameDataDataService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => this.staticRoundData = srd);

    this.ingameDataDataService.getIngameData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(id => {
        if (!!id && !!id.dynamicRoundData) {
          this.dynamicRoundData = id.dynamicRoundData;
        }
    });
  }
}
