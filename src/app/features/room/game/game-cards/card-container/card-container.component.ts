import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { slideToggle } from 'src/app/core/animations/slideToggle';
import { CardType, RoundState } from 'src/app/core/models/enums';
import { Card, Deck, DynamicRoundData, RoomSettings, RoundInformation, StaticRoundData } from 'src/app/core/models/interfaces';
import { IngameDataDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { StaticRoundDataDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { CardService } from 'src/app/core/services/service/card/card.service';
import { GameControlService } from 'src/app/core/services/service/game-control.service';
import { RoomService } from 'src/app/core/services/service/room.service';
import { TutorialService } from 'src/app/core/services/service/tutorial.service';
import { RoomState } from 'src/app/core/state';
import { InformationActions, InformationState } from 'src/app/core/state/information';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

const mobileCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.mobile-swipe-tutorial";
const desktopCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.desktop-swipe-tutorial";
const responseCountTutorialLabelId = "features.room.game.card.game-cards.card-container.response-count-tutorial";

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  animations: [slideToggle]
})
export class CardContainerComponent extends AngularLifecycle{

  roomSettings$: Observable<RoomSettings | undefined> = this.store.select(RoomState.roomSettings);

  deck: Deck;
  staticRoundData: StaticRoundData | null;
  dynamicRoundData: DynamicRoundData | null;

  roundInformation?: RoundInformation;

  state: RoundState;

  get card() : Card | null {
    if (this.staticRoundData?.round?.cardIndex === undefined) return null;
    return this.deck.cards[this.staticRoundData.round.cardIndex];
  }

  get specifiedCardService() {
    return this.cardService.getCardService(this.card?.type);
  }

  constructor(
    private store: Store,
    private gameControlService: GameControlService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private ingameDataDataService: IngameDataDataService,
    private tutorialService: TutorialService,
    private roomService: RoomService,
    private cardService: CardService
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

  roundState: RoundState = undefined as any;

  getRoundState() : RoundState {
    return this.specifiedCardService.getRoundState();
  }

  getCardState() {
    return RoundState.card;
  }

  getHelperCardState() {
    return RoundState.cardHelper;
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
    const singleDeviceModeActive = this.store.selectSnapshot(RoomState.singleDeviceModeActive);

    if (singleDeviceModeActive || this.card!.type === CardType.FreeText) {
      if (this.roomService.isUserAdmin()) {
        this.gameControlService.startNewRound();
      }
      return;
    }

    if (!this.store.selectSnapshot(InformationState.cardAnimationSkipped)) {
      this.store.dispatch(new InformationActions.SetCardAnimationSkippedClicked(true))
      return;
    }

    if (!this.roomService.isUserAdmin()) return;
    this.gameControlService.startNewRound();
  }
}
