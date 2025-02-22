import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { RoomState, StaticRoundData, StaticRoundDataDataService, slideToggle } from '@features';
import { AngularLifecycle, Deck } from '@shared';

@Component({
  selector: 'game-cards',
  templateUrl: './game-cards.component.html',
  animations: [slideToggle]
})
export class GameCardsComponent extends AngularLifecycle {
  
  deck: Deck;

  staticRoundData: StaticRoundData;

  clickCount: number = 0;

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

  increaseClickCount() {
    this.clickCount += 1;
  }

}
