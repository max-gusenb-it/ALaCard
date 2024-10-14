import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs';
import { Card, Player, RoomSettings, Round } from 'src/app/core/models/interfaces';
import { PlayerVotingResponse } from 'src/app/core/models/interfaces/logic/game-data/response-data/player-voting-response';
import { ResponseDataService } from 'src/app/core/services/data/response-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { IngameDataSourceService } from 'src/app/core/services/source/ingame-data.source.service';
import { ResponseDataSourceService } from 'src/app/core/services/source/response-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
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
    private playerVotingService: PlayerVotingCardService,
    private ingameDataSourceService: IngameDataSourceService,
    private store: Store
  ) {
    super();

    // ToDo: Fix -> When players join he is not added to list -> When you updated players it breaks the select when a option is already selected -> after responded reload
    this.players = this.store.selectSnapshot(RoomState.players);

    this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
  }

  ngAfterViewInit() {
    const response = this.playerVotingService.castResponse(
      this.responseDataService.getResponsesForRoundAndUser(this.round.id)
    );

    if(!!response) {
      this.playerVotingForm.controls["votedPlayerId"].disable();
      this.playerVotingForm.controls["votedPlayerId"].setValue(response.votedPlayerId);
      
      this.playerVotingForm.controls["votedPlayerId"].updateValueAndValidity();
      this.changeDetectorRef.detectChanges();
    }
  }

  getCardText() {
    return this.playerVotingService.getCardText(
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
    if (skipped) this.playerVotingForm.controls["votedPlayerId"].setValue("");
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

  processRound() {
    // ToDo: Move to ingameDataService
    this.ingameDataSourceService.updateDynamicRoundData(
      this.store.selectSnapshot(RoomState.roomId)!,
      this.playerVotingService.createDynamicRoundData(
        this.round.id, 
        this.responseDataService.getResponsesForRound(this.round.id)
      )
    );
  }
}
