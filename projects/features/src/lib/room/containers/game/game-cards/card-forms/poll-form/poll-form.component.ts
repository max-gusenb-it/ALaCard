import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { 
    RoomSettings,
    Round,
    GameControlService,
    RoomService,
    CardFormUtils,
    BasePollCardService,
    RoomState,
    CardService,
    pollCardSkipValue,
    PollResponse,
    ResponseDataDataService,
    ResponseDataSourceService
} from "@features";
import { 
    AngularLifecycle,
    AuthenticationState,
    Card,
    InformationActions,
    InformationState,
    PollCard,
    Utils
} from '@shared';


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
    pollCardService: BasePollCardService;

    get formBackgroundCSS() {
        return CardFormUtils.getInteractiveFormBackgroundCSS(this.cardColor)
    }

    get cardColor()  {
        return Utils.isStringDefinedAndNotEmpty(this.castedCard.settings?.customColor) ? 
            this.castedCard.settings!.customColor! : 
            "blue";
    }

    constructor(
        private store: Store,
        private cardService: CardService,
        private responseDataSourceService: ResponseDataSourceService,
        private responseDataDataService: ResponseDataDataService,
        private changeDetectorRef: ChangeDetectorRef,
        private roomService: RoomService,
        private gameControlService: GameControlService
    ) {
        super();

        this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
    }

    ngAfterViewInit(): void {
        this.pollCardService = <BasePollCardService>this.cardService.getCardService(this.card.type);
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
        return this.gameControlService.getAdminResponseCountInfo(this.round.id);
    }

    processRound() {
      this.gameControlService.processRound(this.round.id);
    }
}