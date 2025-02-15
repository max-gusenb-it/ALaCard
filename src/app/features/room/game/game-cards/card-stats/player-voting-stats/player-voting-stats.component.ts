import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { firstValueFrom, takeUntil } from 'rxjs';
import { defaultPayToDisplaySips, playerVotingCardSkipValue } from 'src/app/core/constants/card';
import { Card, DynamicPlayerVotingRoundData, DynamicRoundData, GameSettings, Player, PlayerVotingResult, Round, SipResult } from 'src/app/core/models/interfaces';
import { IngameDataDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { GameControlService } from 'src/app/core/services/service/game-control.service';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { RoomService } from 'src/app/core/services/service/room.service';
import { IngameDataSourceService } from 'src/app/core/services/source/ingame-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { Utils } from 'src/app/core/utils/utils';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'player-voting-stats',
  templateUrl: './player-voting-stats.component.html'
})
export class PlayerVotingStatsComponent extends AngularLifecycle implements AfterViewInit {
  
  @Input() card: Card;
  @Input() round: Round;
  @Input() _dynamicRoundData: DynamicRoundData;
  @Input() gameSettings: GameSettings;

  results: PlayerVotingResult[];

  players: Player[];

  get dynamicRoundData() {
    return this.playerVotingService.castDynamicRoundData(this._dynamicRoundData);
  }

  constructor(
    private gameControlService: GameControlService,
    private playerVotingService: PlayerVotingCardService,
    private translateService: TranslateService,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private popupService: PopupService,
    private ingameDataSourceService: IngameDataSourceService,
    private ingameDataDataService: IngameDataDataService,
    private roomService: RoomService
  ) {
    super();
  }

  get playerVotingCardSkipValue() {
    return playerVotingCardSkipValue;
  }

  ngAfterViewInit(): void {
    this.players = this.store.selectSnapshot(RoomState.players);

    this.ingameDataDataService.getDynamicRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(d => {
        if (!!!d) return;
        const newPayToDisplayPlayerId = this.playerVotingService.getNewPayToDisplayPlayerId(this._dynamicRoundData, d);
        if (newPayToDisplayPlayerId && this.store.selectSnapshot(AuthenticationState.userId) !== newPayToDisplayPlayerId) {
          this.popupService.openSnackbar(this.getPayToDisplayNotificationText(newPayToDisplayPlayerId));
        }
        this._dynamicRoundData = d;
        this.results = this.playerVotingService.getResults(this._dynamicRoundData);

        this.changeDetectorRef.detectChanges();
    });
  }
  
  getPayToDisplayNotificationText(newPayToDisplayPlayerId: string) : string {
    const player = this.players.find(p => p.id === newPayToDisplayPlayerId);
    const notificationPart1 = this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-drinking-notification-1");
    const sips = this.translateService.instant("shared.components.display.it-result.sips");
    const notificationPart2 = this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-drinking-notification-2")
    return `${player?.username} ${notificationPart1} ${defaultPayToDisplaySips} ${sips} ${notificationPart2}`;
  }

  getCastedCard() {
    return this.playerVotingService.castCard(this.card);
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
    return this.playerVotingService.getResultsHeading(this.results);
  }

  getPlayerForResult(result: PlayerVotingResult) {
    return this.players.find(p => p.id === result.votedPlayerId);
  }
  
  getPlayerForSipResult(result: SipResult) {
    return this.playerVotingService.getPlayerForSipResult(result);
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  displayPayToDisplay() {
    return this.gameSettings.drinkingGame && 
      this.getCastedCard()?.settings?.payToDisplay && 
      this.dynamicRoundData && 
      !Utils.isStringDefinedAndNotEmpty(this.dynamicRoundData.payToDisplayPlayerId);
  }

  async payToDisplay() {
    const payToDisplay = await firstValueFrom(
      this.popupService.openOptionBottomSheet(
        this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay-to-display-explanation"),
        this.translateService.instant("actions.cancel"),
        `${this.translateService.instant("features.room.game.game-cards.card-stats.player-voting-stats.pay")} ${defaultPayToDisplaySips} ${this.translateService.instant("shared.components.display.it-result.sips")}`
      ).closed
    );
    if (payToDisplay && !Utils.isStringDefinedAndNotEmpty(this.dynamicRoundData.payToDisplayPlayerId)) {
      this.ingameDataSourceService.updateDynamicRoundData(
        this.store.selectSnapshot(RoomState.roomId)!,
        {
          ...this._dynamicRoundData,
          payToDisplayPlayerId: this.store.selectSnapshot(AuthenticationState.userId)
        } as DynamicPlayerVotingRoundData
      )
    }
  }

  startNextRound() {
    this.gameControlService.startNewRound();
  }

}
