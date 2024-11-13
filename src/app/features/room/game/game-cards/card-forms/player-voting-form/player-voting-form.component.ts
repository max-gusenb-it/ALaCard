import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { playerVotingCardSkipValue } from 'src/app/core/constants/card';
import { CardType } from 'src/app/core/models/enums';
import { Player, PlayerVotingCard, PlayerVotingResponse, RoomSettings, Round } from 'src/app/core/models/interfaces';
import { IngameDataDataService as IngameDataDataService } from 'src/app/core/services/data/ingame-data.data.service';
import { ResponseDataDataService } from 'src/app/core/services/data/response-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { RoomService } from 'src/app/core/services/service/room.service';
import { ResponseDataSourceService } from 'src/app/core/services/source/response-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { InformationActions, InformationState } from 'src/app/core/state/information';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'player-voting-form',
  templateUrl: './player-voting-form.component.html'
})
export class PlayerVotingFormComponent extends AngularLifecycle implements AfterViewInit {
  
  @Input() card: PlayerVotingCard;
  @Input() round: Round;

  playerVotingForm: FormGroup = new FormGroup({
    votedPlayerId: new FormControl({ value: "", disabled: false}, Validators.required)
  });
  
  players: Player[];
  roomSettings: RoomSettings;

  constructor(
    private responseDataSourceService: ResponseDataSourceService,
    private responseDataDataService: ResponseDataDataService,
    private ingameDataDataService: IngameDataDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private playerVotingService: PlayerVotingCardService,
    private store: Store,
    private roomService: RoomService
  ) {
    super();

    this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
  }

  ngAfterViewInit() {
    // ToDo: Fix voted and the reload bug
    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => {
        setTimeout(() => {
          if (!!!p) return;
          if (!!this.card.settings && this.card.settings.selfVoteDisabled === true) {
            this.players = p.filter(p => p.id !== this.store.selectSnapshot(AuthenticationState.userId));
          } else {
            this.players = p;
          }
          this.changeDetectorRef.detectChanges();
        });
    });

    this.store.select(InformationState.response)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(r => {
        const response = this.playerVotingService.castResponse(r ?? null);

        if (!!response) {
          this.playerVotingForm.controls["votedPlayerId"].disable();
          this.playerVotingForm.controls["votedPlayerId"].setValue(response.votedPlayerId);
          
          this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();
          this.changeDetectorRef.detectChanges();
        }
    });
  }

  getCardText() {
    return this.playerVotingService.getCardText(
        this.card,
        this.store.selectSnapshot(RoomState.players),
        this.round.playerIds,
        this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  identifyPlayer(index: number, player: Player): string {
    return player.id;
  }

  userResponded() {
    return this.responseDataDataService.userResponded(this.round.id);
  }

  submit(skipped: boolean = false) {
    if (skipped) this.playerVotingForm.controls["votedPlayerId"].setValue("");
    this.playerVotingForm.controls["votedPlayerId"].disable();
    this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();

    const response : PlayerVotingResponse = {
      playerId: this.store.selectSnapshot(AuthenticationState.userId)!,
      skipped: skipped,
      votedPlayerId: !skipped ? this.playerVotingForm.controls['votedPlayerId'].value : playerVotingCardSkipValue,
      roundId: this.round.id  
    };

    this.responseDataSourceService.addResponse(
      this.store.selectSnapshot(RoomState.room)!.id!,
      response
    );
    this.store.dispatch(new InformationActions.SetRoundResponded(response));
  }

  isUserRoomAdmin() {
    return this.roomService.isUserAdmin();
  }

  getAdminResponseCountInfo() {
   return this.responseDataDataService.getAdminResponseCountInfo(this.round.id);
  }

  processRound() {
    this.ingameDataDataService.processRound(
      this.round.id,
      CardType.PlayerVoting,
      this.responseDataDataService.getAdminResponsesForRound(this.round.id)
    );
  }
}
