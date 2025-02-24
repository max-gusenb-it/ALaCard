import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { 
  CardServiceFactory,
  DynamicTopicVotingRoundData,
  GameService,
  IngameDataDataService,
  RoomService,
  RoomState,
  Round,
  TopicVotingCardService,
  ColorUtils,
  CardUtils,
  topicVotingCardSkipValue
} from "@features";
import { 
  AngularLifecycle,
  Card,
  TopicVotingCardResultConfig,
  VotingResult,
  SipResult,
  CardType,
  TopicVotingCard,
  TopicVotingResult
} from '@shared';

@Component({
  selector: 'it-topic-voting-stats',
  templateUrl: './it-topic-voting-stats.component.html'
})
export class ItTopicVotingStatsComponent extends AngularLifecycle implements AfterViewInit {
  @Input() card: Card;
  @Input() round: Round;

  get topicVotingCardService(): TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig> {
    return <TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig>>this.cardServiceFactory.getCardService(this.card.type);
  }
  
  get statsBackgroundCSS() {
    return ColorUtils.getBackground100CSS(this.cardColor)
  }

  get cardColor()  {
    return CardUtils.getCardColor(this.card);
  }

  get gameSettings() {
    return this.store.selectSnapshot(RoomState.gameSettings);
  }

  get topicVotingCardSkipValue() {
    return topicVotingCardSkipValue;
  }

  get sipResultColumnCount() {
    if (window.innerWidth >= 380)
      return 5;
    else
      return 4;
  }

  castedCard: TopicVotingCard;
  dynamicRoundData: DynamicTopicVotingRoundData;
  results: TopicVotingResult[];

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

  ngAfterViewInit(): void {
    this.castedCard = this.topicVotingCardService.castCard(this.card);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dynamicRoundData => {
        if (!!!dynamicRoundData) return;
        this.results = this.topicVotingCardService.getResults(dynamicRoundData, this.card);
        this.changeDetectorRef.detectChanges();
      });
  }

  getCardText() {
    return this.topicVotingCardService.getCardText(
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
    return this.topicVotingCardService.getTopResults(this.results).length;
  }

  getResultsHeading() {
    return this.topicVotingCardService.getResultsHeading(this.results, this.card);
  }

  // ToDo: structure: move into card service 

  getResultTitle(result: TopicVotingResult, resultIndex: number) {
    if (this.card.type === CardType.TopicVotingCard) {
      return this.getTopResultsCount() === 1 && resultIndex !== 0 || this.getTopResultsCount() !== 1 ? this.getSubject(result.subjectID)?.title : undefined
    } else {
      if (resultIndex !== 0)
        return this.getSubject(result.subjectID)?.title;
    }
    return undefined;
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.topicVotingCardService.getPlayerForSipResult(result);
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