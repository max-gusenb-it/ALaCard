import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, takeUntil } from 'rxjs';
import { defaultPayToDisplaySips } from 'src/app/core/constants/card';
import { Card, DynamicPlayerVotingRoundData, DynamicRoundData, GameSettings, Player, PlayerVotingResult, Result, Round, SipResult } from 'src/app/core/models/interfaces';
import { IngameDataDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { StaticRoundDataDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { IngameDataSourceService } from 'src/app/core/services/source/ingame-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { RoomUtils } from 'src/app/core/utils/room.utils';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'player-voting-stats',
  templateUrl: './player-voting-stats.component.html'
})
export class PlayerVotingStatsComponent extends AngularLifecycle implements AfterViewInit {
  
  @Input() card: Card;
  @Input() round: Round;
  @Input() dynamicRoundData: DynamicRoundData;
  @Input() gameSettings: GameSettings;

  results: PlayerVotingResult[];
  sipResults: SipResult[];
  userSipResult: SipResult;

  players: Player[];

  constructor(
    private staticRoundDataDataService: StaticRoundDataDataService,
    private playerVotingService: PlayerVotingCardService,
    private translateService: TranslateService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private popupService: PopupService,
    private ingameDataSourceService: IngameDataSourceService,
    private ingameDataDataService: IngameDataDataService
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.players = this.store.selectSnapshot(RoomState.players);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => {
        if (!!!d) return; 
        this.dynamicRoundData = d;
        this.results = this.playerVotingService.getResults(this.dynamicRoundData);
        this.sipResults = this.playerVotingService.getSipResults(this.dynamicRoundData);

        const userSR = this.sipResults.find(s => s.playerId === this.store.selectSnapshot(AuthenticationState.userId));
        if (!!userSR) {
          this.userSipResult = userSR;
          this.sipResults = this.sipResults.filter(s => s.playerId !== this.userSipResult.playerId);
        }
        this.changeDetectorRef.detectChanges();
    });
  }

  getCastedCard() {
    return this.playerVotingService.castCard(this.card);
  }

  getCastedDynamicRoundData() {
    return this.playerVotingService.castDynamicRoundData(this.dynamicRoundData);
  }

  getCardText() {
    return this.playerVotingService.getCardText(
        this.card,
        this.store.selectSnapshot(RoomState.players),
        this.round.playerIds,
        this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  getResultsHeading() {
    const player = this.getPlayerForResult(this.results[0]);
    if (player) {
      return player.username;
    } else {
      return this.translateService.instant("features.room.game.game-cards.card-stats.skipped")
    }
  }

  getPlayerForResult(result: PlayerVotingResult) {
    return this.players.find(p => p.id === result.votedPlayerId);
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.playerVotingService.getPlayerForSipResult(this.players, result);
  }

  isUserRoomAdmin() {
    return RoomUtils.isUserAdmin(this.store);
  }

  async payToDisplay() {
    const payToDisplay = await firstValueFrom(
      this.popupService.openOptionBottomSheet(
        this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-explanation"),
        this.translateService.instant("actions.cancel"),
        `${this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay")} ${defaultPayToDisplaySips} ${this.translateService.instant("features.room.game.game-cards.sips")}`
      ).closed
    );
    if (payToDisplay) {
      this.ingameDataSourceService.updateDynamicRoundData(
        this.store.selectSnapshot(RoomState.roomId)!,
        {
          ...this.dynamicRoundData,
          payedToDisplayPlayerId: this.store.selectSnapshot(AuthenticationState.userId)
        } as DynamicPlayerVotingRoundData
      )
    }
  }

  startNextRound() {
    this.staticRoundDataDataService.startNewRound();
  }

}
