import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { Deck, DynamicRoundData, GameSettings, StaticRoundData } from 'projects/app/src/app/core/models/interfaces';
import { IngameDataDataService } from 'projects/app/src/app/core/services/data/ingame-data.data.service';
import { StaticRoundDataDataService } from 'projects/app/src/app/core/services/data/static-round-data.data.service';
import { RoomState } from 'projects/app/src/app/core/state';
import { AngularLifecycle } from 'projects/app/src/app/shared/helper/angular-lifecycle.helper';

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
