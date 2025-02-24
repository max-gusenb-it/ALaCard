import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { takeUntil } from "rxjs";
import { 
    RoomSettings,
    Round,
    GameService,
    RoomService,
    RoomState,
    CardServiceFactory,
    TopicVotingResponse,
    ResponseDataDataService,
    ResponseDataSourceService,
    TopicVotingCardService,
    ColorUtils,
    CardUtils,
    topicVotingCardSkipValue
} from "@features";
import { 
    AngularLifecycle,
    AuthenticationState,
    Card,
    InformationActions,
    TopicVotingCardResultConfig,
    InformationState,
    TopicVotingCard,
    CardType
} from '@shared';


@Component({
    selector: 'it-topic-voting-form',
    templateUrl: './it-topic-voting-form.component.html'
})
export class ItTopicVotingFormComponent extends AngularLifecycle implements AfterViewInit {
    @Input() card: Card;
    @Input() round: Round;

    get topicVotingCardService(): TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig> {
      return <TopicVotingCardService<TopicVotingCard, TopicVotingCardResultConfig>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get formBackgroundCSS() {
        return ColorUtils.getBackground100CSS(this.cardColor)
    }

    get cardColor()  {
        return CardUtils.getCardColor(this.card);
    }

    get topicVotingCardType() {
        return CardType.TopicVotingCard;
    }

    castedCard: TopicVotingCard;
    topicVotingForm: FormGroup = new FormGroup({
        votedSubjectId: new FormControl({ value: "", disabled: false }, Validators.required)
    });

    roomSettings: RoomSettings;

    constructor(
        private store: Store,
        private cardServiceFactory: CardServiceFactory,
        private responseDataSourceService: ResponseDataSourceService,
        private responseDataDataService: ResponseDataDataService,
        private changeDetectorRef: ChangeDetectorRef,
        private roomService: RoomService,
        private gameService: GameService
    ) {
        super();

        this.roomSettings = this.store.selectSnapshot(RoomState.roomSettings)!;
    }

    ngAfterViewInit(): void {
        this.castedCard = this.topicVotingCardService.castCard(this.card);
        this.changeDetectorRef.detectChanges();
        
        this.store.select(InformationState.response)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(r => {
            const response = this.topicVotingCardService.castResponse(r ?? null);
    
            if (!!response) {
                this.topicVotingForm.controls["votedSubjectId"].disable();
                this.topicVotingForm.controls["votedSubjectId"].setValue(response.votedSubjectIds[0]);
                
                this.topicVotingForm.controls["votedSubjectId"].updateValueAndValidity();
                this.changeDetectorRef.detectChanges();
            }
        });
    }

    getCardTitle() {
        return this.topicVotingCardService.getCardTitle(this.card)
    }

    getCardText() {
      return this.topicVotingCardService.getCardText(
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
        if (skipped) this.topicVotingForm.controls["votedSubjectId"].setValue("");
        this.topicVotingForm.controls["votedSubjectId"].disable();
        this.topicVotingForm.controls["votedSubjectId"].updateValueAndValidity();
    
        const response : TopicVotingResponse = {
          playerId: this.store.selectSnapshot(AuthenticationState.userId)!,
          skipped: skipped,
          votedSubjectIds: !skipped ? [Number(this.topicVotingForm.controls['votedSubjectId'].value)] : [topicVotingCardSkipValue],
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