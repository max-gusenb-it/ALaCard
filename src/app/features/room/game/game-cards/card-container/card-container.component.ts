import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { slideToggle } from 'src/app/core/animations/slideToggle';
import { CardType } from 'src/app/core/models/enums';
import { Deck, DynamicRoundData, RoundInformation, StaticRoundData } from 'src/app/core/models/interfaces';
import { IngameDataDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { ResponseDataDataService } from 'src/app/core/services/data/response-data.data.service';
import { StaticRoundDataDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { RoomService } from 'src/app/core/services/service/room.service';
import { TutorialService } from 'src/app/core/services/service/tutorial.service';
import { RoomState } from 'src/app/core/state';
import { InformationActions, InformationState } from 'src/app/core/state/information';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

const mobileCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.mobile-swipe-tutorial";
const desktopCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.desktop-swipe-tutorial";
const responseCountTutorialLabelId = "features.room.game.card.game-cards.card-container.response-count-tutorial";

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

  state: RoundState;

  constructor(
    private store: Store,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private responseDataDataService: ResponseDataDataService,
    private ingameDataDataService: IngameDataDataService,
    private tutorialService: TutorialService,
    private roomService: RoomService
  ) {
    super();

    this.state = RoundState.card;

    this.deck = this.store.selectSnapshot(RoomState.deck)!;

    this.staticRoundDataDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(srd => {
        if (srd.round?.id !== undefined && this.staticRoundData?.round?.id !== srd?.round?.id) {
          this.store.dispatch(new InformationActions.SetRoundId(srd.round.id));
        }
        this.staticRoundData = srd;
    });

    this.store.select(InformationState.roundInformation)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(ri => {
        this.roundInformation = ri;
        if (!!ri?.response &&
            !!this.staticRoundData && this.staticRoundData.round?.id === ri.roundId &&
            this.roomService.isUserAdmin() &&
            this.getRoundState() === this.getFormState()
        ) {
          this.tutorialService.checkForTutorial(responseCountTutorialLabelId);
        }
    });

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => {
        this.dynamicRoundData = d;
    });

    this.tutorialService.checkForDualTutorial(
      mobileCardSwipeTutorialLabelId,
      desktopCardSwipeTutorialLabelId
    );
  }

  getCustomCardTitle() {
    if (!!this.deck.styleSettings) {
      if (this.deck.styleSettings.customCardTitle) return this.deck.styleSettings.customCardTitle;
      if (this.deck.styleSettings.displayDeckNameAsCardTitle) return this.deck.name
    }
    return undefined;
  }

  getRoundState() : RoundState {
    if (
      !this.cardClicked &&
      !this.responseDataDataService.userResponded(this.staticRoundData!.round!.id) && 
      (!!!this.roundInformation || this.roundInformation.roundId !== this.staticRoundData!.round!.id || !this.roundInformation.cardClicked) &&
      (!!!this.dynamicRoundData || this.dynamicRoundData.roundId !== this.staticRoundData!.round!.id || !this.dynamicRoundData.processed)
    ) {
      return RoundState.card;
    }
    if (!this.ingameDataDataService.roundProcessed(this.staticRoundData!.round!.id)) {
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

  swipe(direction: boolean) {
    if (direction) this.continue();
  }

  continue() {
    // ToDo: Auto continue when everyone voted
    const card = this.deck.cards[this.staticRoundData!.round!.cardIndex!];
    
    if (card.type === CardType.FreeText) {
      if (!this.roomService.isUserAdmin()) return;
      this.staticRoundDataDataService.startNewRound();
      return;
    }

    this.cardClicked = true;
    this.store.dispatch(new InformationActions.SetRoundCardClicked());
  }
}
