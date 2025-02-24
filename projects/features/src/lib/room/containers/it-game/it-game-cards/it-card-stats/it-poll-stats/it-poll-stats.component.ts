import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { 
  CardServiceFactory,
  DynamicPollRoundData,
  GameService,
  IngameDataDataService,
  pollCardSkipValue,
  RoomService,
  RoomState,
  Round,
  PollCardResultConfig,
  PollResult,
  SipResult,
  PollCardService,
  ColorUtils,
  CardUtils
} from "@features";
import { 
  AngularLifecycle,
  Card,
  CardType,
  PollCard
} from '@shared';

@Component({
  selector: 'it-poll-stats',
  templateUrl: './it-poll-stats.component.html'
})
export class ItPollStatsComponent extends AngularLifecycle implements AfterViewInit {
  @Input() card: Card;
  @Input() round: Round;

  get pollCardService(): PollCardService<PollCard, PollCardResultConfig> {
    return <PollCardService<PollCard, PollCardResultConfig>>this.cardServiceFactory.getCardService(this.card.type);
  }
  
  get statsBackgroundCSS() {
    return ColorUtils.getBackground100CSS(this.cardColor)
  }

  get cardColor()  {
    return CardUtils.getCardColor(this.card);
  }

  castedCard: PollCard;
  dynamicRoundData: DynamicPollRoundData;
  results: PollResult[];

  constructor(
    private store: Store,
    private gameService: GameService,
    private cardServiceFactory: CardServiceFactory,
    private roomService: RoomService,
    private ingameDataDataService: IngameDataDataService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  get gameSettings() {
    return this.store.selectSnapshot(RoomState.gameSettings);
  }

  get pollCardSkipValue() {
    return pollCardSkipValue;
  }

  get sipResultColumnCount() {
    if (window.innerWidth >= 380)
      return 5;
    else
      return 4;
  }

  ngAfterViewInit(): void {
    this.castedCard = this.pollCardService.castCard(this.card);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dynamicRoundData => {
        if (!!!dynamicRoundData) return;
        this.results = this.pollCardService.getResults(dynamicRoundData, this.card);
        this.changeDetectorRef.detectChanges();
      });
  }

  getCardText() {
    return this.pollCardService.getCardText(
      this.card,
      this.store.selectSnapshot(RoomState.players),
      this.round.playerIds,
      this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  getSubject(subjectId: number) {
    return this.castedCard.subjects.find(s => s.id! === subjectId);
  }

  getTopResultsCount() {
    return this.pollCardService.getTopResults(this.results).length;
  }

  getResultsHeading() {
    return this.pollCardService.getResultsHeading(this.results, this.card);
  }

  // ToDo: structure: move into card service 

  getResultTitle(result: PollResult, resultIndex: number) {
    if (this.card.type === CardType.TopicVotingCard) {
      return this.getTopResultsCount() === 1 && resultIndex !== 0 || this.getTopResultsCount() !== 1 ? this.getSubject(result.subjectId)?.title : undefined
    } else {
      if (resultIndex !== 0)
        return this.getSubject(result.subjectId)?.title;
    }
    return undefined;
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.pollCardService.getPlayerForSipResult(result);
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  startNextRound() {
    this.gameService.startNewRound();
  }

  /**
   * Checks, how many sip results would be needed to fill up a row.
   *
   * @returns An array containing the amount needed to fill up the sip result row with number values
   */
  getMissingRowElements(sipResults?: SipResult[]) : number[] {
    let missingRowElementCount = this.sipResultColumnCount;
    if (!!sipResults) {
      if (sipResults.length < this.sipResultColumnCount) {
        missingRowElementCount = this.sipResultColumnCount - sipResults.length;
      } else {
        missingRowElementCount = sipResults.length - Math.trunc(sipResults.length / this.sipResultColumnCount) * this.sipResultColumnCount;
      }
    }
    return Array.from(Array(missingRowElementCount).keys());
  }
}