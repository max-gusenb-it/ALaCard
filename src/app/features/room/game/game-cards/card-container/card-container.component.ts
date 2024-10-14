import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { slideToggle } from 'src/app/core/animations/slideToggle';
import { Deck, StaticRoundData } from 'src/app/core/models/interfaces';
import { IngameDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { ResponseDataService } from 'src/app/core/services/data/response-data.data.service';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

enum RoundState {
  card,
  form,
  stats
}

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  animations: [slideToggle]
})
export class CardContainerComponent extends AngularLifecycle{

  deck: Deck;
  staticRoundData: StaticRoundData;
  
  cardClicked: boolean = false;

  constructor(
    private store: Store,
    private staticRoundDataService: StaticRoundDataService,
    private responseDataService: ResponseDataService,
    private ingameDataService: IngameDataService
  ) {
    super();

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        this.staticRoundData = srd;
    });
  }

  getRoundState() : RoundState {
    if (!this.cardClicked && !this.responseDataService.userResponded(this.staticRoundData.round!.id)) {
      return RoundState.card;
    }
    if (!this.ingameDataService.roundProcessed(this.staticRoundData.round!.id)) {
      return RoundState.form;
    }
    return RoundState.stats;
  }

  getCardState() {
    return RoundState.card;
  }

  getFormState() {
    return RoundState.form;
  }

  getStatsState() {
    return RoundState.stats;
  }

  continue() {
    this.cardClicked = true;
    // ToDo: add to information store
  }

}
