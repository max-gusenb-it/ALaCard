import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { Card, Player, RoomSettings, Round } from 'src/app/core/models/interfaces';
import { PlayerVotingResponse } from 'src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response';
import { ResponseDataService } from 'src/app/core/services/data/response-data.data.service';
import { ResponseDataSourceService } from 'src/app/core/services/source/response-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { CardUtils } from 'src/app/core/utils/card.utils';
import { RoomUtils } from 'src/app/core/utils/room.utils';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'player-voting-form',
  templateUrl: './player-voting-form.component.html'
})
export class PlayerVotingFormComponent extends AngularLifecycle implements AfterViewInit {

  playerVotingForm: FormGroup = new FormGroup({
    votedPlayerId: new FormControl({ value: "", disabled: false}, Validators.required)
  });
  
  players: Player[];
  roomSettings: RoomSettings;
  
  @Input() card: Card;
  @Input() round: Round;

  constructor(
    private responseSourceService: ResponseDataSourceService,
    private responseDataService: ResponseDataService,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store
  ) {
    super();

    this.store.select(RoomState.players)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(p => this.players = p);

    this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
  }

  ngAfterViewInit() {
    if(this.responseDataService.userResponded(this.round.id)) {
      this.playerVotingForm.controls["votedPlayerId"].disable();
      this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();
      this.changeDetectorRef.detectChanges();
    }
  }

  getCardText() {
    return CardUtils.getCardService(this.card.type)
      .getCardText(
        this.card,
        this.store.selectSnapshot(RoomState.players),
        this.round.playerIds,
        this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  userResponded() {
    return this.responseDataService.userResponded(this.round.id);
  }

  submit(skipped: boolean = false) {
    this.playerVotingForm.controls["votedPlayerId"].disable();
    this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();
    this.responseSourceService.addResponse(
      this.store.selectSnapshot(RoomState.room)!.id!,
      {
        playerId: this.store.selectSnapshot(AuthenticationState.userid),
        skipped: skipped,
        votedPlayerId: !skipped ? this.playerVotingForm.controls['votedPlayerId'].value : null,
        roundId: this.round.id  
      } as PlayerVotingResponse
    )
  }

  isUserRoomAdmin() {
    return RoomUtils.isUserAdmin(this.store);
  }

  getRulesReadInfo() {
   return this.responseDataService.getRulesReadInfo(this.round.id);
  }

}
