import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { PlayerVotingCardService } from 'projects/app/src/app/core/services/service/card/player-voting-card.service';
import { RoomState } from 'projects/app/src/app/core/state';
import { AngularLifecycle, Card, Deck, StaticRoundData, StaticRoundDataDataService } from '@shared';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
})
export class CardFormComponent extends AngularLifecycle {

  deck: Deck;
  staticRoundData: StaticRoundData;

  constructor(
    private store: Store,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private playerVotingCardService: PlayerVotingCardService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        this.staticRoundData = srd;
    });
  }

  getPlayerVotingCard(card: Card) {
    return this.playerVotingCardService.castCard(card);
  }

}
