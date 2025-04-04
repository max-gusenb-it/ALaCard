import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import {
  RoomState,
  slideToggle,
  CardServiceFactory,
  RoomSettings,
  GameService,
  RoomService,
  DynamicRoundData,
  RoundState,
  StaticRoundData,
  IngameDataDataService,
  StaticRoundDataDataService
} from '@features';
import { 
  AngularLifecycle,
  Card,
  CardType,
  Deck,
  InformationActions,
  InformationState,
  RoundInformation
} from '@shared';

const mobileCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.mobile-swipe-tutorial";
const desktopCardSwipeTutorialLabelId = "features.room.game.card.game-cards.card-container.desktop-swipe-tutorial";
const responseCountTutorialLabelId = "features.room.game.card.game-cards.card-container.response-count-tutorial";

@Component({
  selector: 'it-card-container',
  templateUrl: './it-card-container.component.html',
  animations: [slideToggle]
})
export class ItCardContainerComponent extends AngularLifecycle{

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

  get cardService() {
    return this.cardServiceFactory.getCardService(this.card?.type);
  }

  get cardState() {
    return this.staticRoundDataDataService.cardState;
  }

  constructor(
    private store: Store,
    private gameService: GameService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private ingameDataDataService: IngameDataDataService,
    private roomService: RoomService,
    private cardServiceFactory: CardServiceFactory
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
          this.store.dispatch(new InformationActions.NewDisplayTutorial(responseCountTutorialLabelId));
        }
    });

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => {
        this.dynamicRoundData = d;
    });

    this.store.dispatch(new InformationActions.DisplayDualTutorial(
      mobileCardSwipeTutorialLabelId,
      desktopCardSwipeTutorialLabelId
    ));
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
    return this.cardService.getRoundState();
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
    const singleDeviceModeActive = this.store.selectSnapshot(RoomState.singleDeviceModeActive);

    if (singleDeviceModeActive || this.card!.type === CardType.FreeText) {
      if (this.roomService.isUserAdmin()) {
        this.gameService.startNewRound();
      }
      return;
    }

    if (!this.store.selectSnapshot(InformationState.cardAnimationSkipped)) {
      this.store.dispatch(new InformationActions.SetCardAnimationSkippedClicked(true))
      return;
    }

    if (!this.roomService.isUserAdmin()) return;
    this.gameService.startNewRound();
  }
}
