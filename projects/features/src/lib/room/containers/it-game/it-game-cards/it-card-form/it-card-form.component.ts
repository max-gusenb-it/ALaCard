import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { AngularLifecycle, CardType, Deck } from '@shared';
import { StaticRoundData, StaticRoundDataDataService, RoomState } from '@features';

@Component({
  selector: 'it-card-form',
  templateUrl: './it-card-form.component.html',
})
export class ItCardFormComponent extends AngularLifecycle {

  get cardType() {
    return CardType;
  }

  deck: Deck;
  staticRoundData: StaticRoundData;

  constructor(
    private store: Store,
    private staticRoundDataDataService: StaticRoundDataDataService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        this.staticRoundData = srd;
    });
  }

}
