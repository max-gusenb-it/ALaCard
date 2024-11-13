import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { pollCardSkipValue } from "src/app/core/constants/card";
import { CardType } from "src/app/core/models/enums";
import { Card, RoomSettings, Round, PollCard, PollResponse } from "src/app/core/models/interfaces";
import { IngameDataDataService } from "src/app/core/services/data/ingame-data.data.service";
import { ResponseDataDataService } from "src/app/core/services/data/response-data.data.service";
import { PollCardService } from "src/app/core/services/service/card/poll-card.service";
import { RoomService } from "src/app/core/services/service/room.service";
import { ResponseDataSourceService } from "src/app/core/services/source/response-data.source.service";
import { AuthenticationState, RoomState } from "src/app/core/state";
import { InformationActions, InformationState } from "src/app/core/state/information";
import { AngularLifecycle } from "src/app/shared/helper/angular-lifecycle.helper";

@Component({
    selector: 'poll-form',
    templateUrl: './poll-form.component.html'
})
export class PollFormComponent extends AngularLifecycle implements AfterViewInit {
    @Input() card: Card;
    @Input() round: Round;

    castedCard: PollCard;
    pollForm: FormGroup = new FormGroup({
        votedSubjectId: new FormControl({ value: "", disabled: false }, Validators.required)
    });

    roomSettings: RoomSettings;

    constructor(
        private store: Store,
        private pollCardService: PollCardService,
        private responseDataSourceService: ResponseDataSourceService,
        private responseDataDataService: ResponseDataDataService,
        private changeDetectorRef: ChangeDetectorRef,
        private roomService: RoomService,
        private ingameDataDataService: IngameDataDataService
    ) {
        super();

        this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
    }

    ngAfterViewInit(): void {
        this.castedCard = this.pollCardService.castCard(this.card);
        this.changeDetectorRef.detectChanges();
        
        this.store.select(InformationState.response)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(r => {
            const response = this.pollCardService.castResponse(r ?? null);
    
            if (!!response) {
                this.pollForm.controls["votedSubjectId"].disable();
                this.pollForm.controls["votedSubjectId"].setValue(response.votedSubjectIds[0]);
                
                this.pollForm.controls["votedSubjectId"].updateValueAndValidity();
                this.changeDetectorRef.detectChanges();
            }
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

    userResponded() {
      return this.responseDataDataService.userResponded(this.round.id);
    }

    submit(skipped: boolean = false) {
        if (skipped) this.pollForm.controls["votedSubjectId"].setValue("");
        this.pollForm.controls["votedSubjectId"].disable();
        this.pollForm.controls["votedSubjectId"].updateValueAndValidity();
    
        const response : PollResponse = {
          playerId: this.store.selectSnapshot(AuthenticationState.userId)!,
          skipped: skipped,
          votedSubjectIds: !skipped ? [Number(this.pollForm.controls['votedSubjectId'].value)] : [pollCardSkipValue],
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
        CardType.TopicVotingCard,
        this.responseDataDataService.getAdminResponsesForRound(this.round.id)
      );
    }
}