import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import {
  RoomState,
  Round,
  RoomService,
  GameService,
  Player,
  RoomSettings,
  PlayerVotingCardService,
  PlayerVotingResponse,
  playerVotingCardSkipValue,
  ResponseDataDataService,
  ResponseDataSourceService
} from '@features';
import { 
  AngularLifecycle,
  AuthenticationState,
  InformationActions,
  InformationState,
  PlayerVotingCard,
} from '@shared';

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
    private gameService: GameService,
    private changeDetectorRef: ChangeDetectorRef,
    private playerVotingCardService: PlayerVotingCardService,
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
        const response = this.playerVotingCardService.castResponse(r ?? null);

        if (!!response) {
          this.playerVotingForm.controls["votedPlayerId"].disable();
          this.playerVotingForm.controls["votedPlayerId"].setValue(response.votedPlayerId);
          
          this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();
          this.changeDetectorRef.detectChanges();
        }
    });
  }

  getCardText() {
    return this.playerVotingCardService.getCardText(
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
   return this.gameService.getAdminResponseCountInfo(this.round.id);
  }

  processRound() {
    this.gameService.processRound(this.round.id);
  }
}
