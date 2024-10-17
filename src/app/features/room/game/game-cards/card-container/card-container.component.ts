import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { slideToggle } from 'src/app/core/animations/slideToggle';
import { Deck, DynamicRoundData, RoundInformation, StaticRoundData } from 'src/app/core/models/interfaces';
import { IngameDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { ResponseDataService } from 'src/app/core/services/data/response-data.data.service';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { RoomState } from 'src/app/core/state';
import { InformationActions, InformationState } from 'src/app/core/state/information';
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
  staticRoundData: StaticRoundData | null;
  dynamicRoundData: DynamicRoundData | null;
  
  cardClicked: boolean = false;

  roundInformation?: RoundInformation;

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
        if (srd.round?.id !== undefined && this.staticRoundData?.round?.id !== srd?.round?.id) {
          this.store.dispatch(new InformationActions.SetRoundId(srd.round.id));
        }
        this.staticRoundData = srd;
      });

    this.roundInformation = this.store.selectSnapshot(InformationState.roundInformation);

    this.ingameDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => this.dynamicRoundData = d);
  }

  getRoundState() : RoundState {
    if (
      !this.cardClicked &&
      !this.responseDataService.userResponded(this.staticRoundData!.round!.id) && 
      (!!!this.roundInformation || this.roundInformation.roundId !== this.staticRoundData!.round!.id || !this.roundInformation.cardClicked) &&
      (!!!this.dynamicRoundData || this.dynamicRoundData.roundId !== this.staticRoundData!.round!.id || !this.dynamicRoundData.processed)
    ) {
      return RoundState.card;
    }
    if (!this.ingameDataService.roundProcessed(this.staticRoundData!.round!.id)) {
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
    this.store.dispatch(new InformationActions.SetRoundCardClicked());
  }
}
