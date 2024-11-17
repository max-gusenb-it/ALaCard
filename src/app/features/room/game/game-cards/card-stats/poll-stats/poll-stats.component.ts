import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { pollCardSkipValue } from "src/app/core/constants/card";
import { Card, PollCard, Round } from "src/app/core/models/interfaces";
import { PollResult } from "src/app/core/models/interfaces/logic/cards/poll-card/poll-result";
import { DynamicPollRoundData } from "src/app/core/models/interfaces/logic/game-data/ingame-data/dynamic-round-data/dynamic-poll-card-round.data";
import { IngameDataDataService } from "src/app/core/services/data/ingame-data.data.service";
import { StaticRoundDataDataService } from "src/app/core/services/data/static-round-data.data.service";
import { CardService } from "src/app/core/services/service/card/card.service";
import { RoomService } from "src/app/core/services/service/room.service";
import { RoomState } from "src/app/core/state";
import { BasePollCardService } from "src/app/core/types/card";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";

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

  constructor(
    private store: Store,
    private cardService: CardService,
    private roomService: RoomService,
    private ingameDataDataService: IngameDataDataService,
    private staticRoundDataDataService: StaticRoundDataDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.pollCardService = <BasePollCardService>this.cardService.getCardService(this.card.type);
    this.castedCard = this.pollCardService.castCard(this.card);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => {
        if (!!!d) return;
        this.dynamicRoundData = this.pollCardService.castDynamicRoundData(d);
        this.results = this.pollCardService.getResults(this.dynamicRoundData);
        
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

  getResultsHeading() {
    return this.pollCardService.getResultsHeading(this.results, this.card);
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  startNextRound() {
    this.staticRoundDataDataService.startNewRound();
  }
}