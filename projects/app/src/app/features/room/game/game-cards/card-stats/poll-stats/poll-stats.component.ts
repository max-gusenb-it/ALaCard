import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { pollCardSkipValue } from "projects/app/src/app/core/constants/card";
import { Card, PollCard, Round, SipResult } from "projects/app/src/app/core/models/interfaces";
import { PollResult } from "projects/app/src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { DynamicPollRoundData } from "projects/app/src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { IngameDataDataService } from "projects/app/src/app/core/services/data/ingame-data.data.service";
import { CardService } from "projects/app/src/app/core/services/service/card/card.service";
import { GameControlService } from "projects/app/src/app/core/services/service/game-control.service";
import { RoomService } from "projects/app/src/app/core/services/service/room.service";
import { RoomState } from "projects/app/src/app/core/state";
import { BasePollCardService } from "projects/app/src/app/core/types/card";
import { CardFormUtils } from "projects/app/src/app/core/utils/card-form.utils";
import { Utils } from "projects/app/src/app/core/utils/utils";
import { AngularLifecycle } from "projects/app/src/app/shared/helper/angular-lifecycle.helper";

@Component({
  selector: 'poll-stats',
  templateUrl: './poll-stats.component.html'
})
export class PollStatsComponent extends AngularLifecycle implements AfterViewInit {
  @Input() card: Card;
  @Input() round: Round;

  pollCardService: BasePollCardService
  castedCard: PollCard;
  dynamicRoundData: DynamicPollRoundData;
  results: PollResult[];
  
  get statsBackgroundCSS() {
      return CardFormUtils.getInteractiveFormBackgroundCSS(this.cardColor)
  }

  get cardColor()  {
      return Utils.isStringDefinedAndNotEmpty(this.castedCard.settings?.customColor) ? 
          this.castedCard.settings!.customColor! : 
          "blue";
  }

  constructor(
    private store: Store,
    private gameControlService: GameControlService,
    private cardService: CardService,
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
    this.pollCardService = <BasePollCardService>this.cardService.getCardService(this.card.type);
    this.castedCard = this.pollCardService.castCard(this.card);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(dynamicRoundData => {
        if (!!!dynamicRoundData) return;
        this.results = this.pollCardService.getResults(dynamicRoundData);
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
  
  getPlayerForSipResult(result: SipResult) {
    return this.pollCardService.getPlayerForSipResult(result);
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  startNextRound() {
    this.gameControlService.startNewRound();
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