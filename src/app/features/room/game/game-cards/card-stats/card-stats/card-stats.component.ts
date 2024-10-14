import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { Deck, StaticRoundData } from 'src/app/core/models/interfaces';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'card-stats',
  templateUrl: './card-stats.component.html',
})
export class CardStatsComponent extends AngularLifecycle {

  deck: Deck;
  staticRoundData: StaticRoundData;

  constructor(
    private store: Store,
    private staticRoundDataService: StaticRoundDataService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        this.staticRoundData = srd;
    });
  }
}
