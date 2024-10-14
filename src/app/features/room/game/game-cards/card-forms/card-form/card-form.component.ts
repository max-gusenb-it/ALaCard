import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { Card, Deck, StaticRoundData } from 'src/app/core/models/interfaces';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
})
export class CardFormComponent extends AngularLifecycle {

  deck: Deck;
  staticRoundData: StaticRoundData;

  constructor(
    private store: Store,
    private staticRoundDataService: StaticRoundDataService,
    private playerVotingCardService: PlayerVotingCardService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        this.staticRoundData = srd;
    });
  }

  getPlayerVotingCard(card: Card) {
    return this.playerVotingCardService.castCard(card);
  }

}
