import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import {
  RoomState,
  DynamicRoundData,
  GameSettings,
  StaticRoundData
} from '@features';
import { 
  AngularLifecycle,
  Deck,
  IngameDataDataService,
  StaticRoundDataDataService
} from '@shared';

@Component({
  selector: 'card-stats',
  templateUrl: './card-stats.component.html',
})
export class CardStatsComponent extends AngularLifecycle {

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
