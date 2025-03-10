import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Round, CardServiceFactory, VotingCardService, ColorUtils, CardUtils, RoomState, ResponseDataDataService, ResponseDataSourceService, RoomService, GameService } from "@features";
import { AngularLifecycle, Card, InformationActions, InformationState, NewSubject, VotingCard, } from "@shared";
import { takeUntil } from "rxjs";

@Component({
    selector: 'it-voting-form',
    templateUrl: './it-voting-form.component.html'
})
export class ItVotingFormComponent extends AngularLifecycle implements AfterViewInit {
    @Input() card: Card;
    @Input() round: Round;
    
    get votingCardService() {
        return <VotingCardService<VotingCard>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get votingCardTranslationService() {
        return this.cardServiceFactory.getCardTranslationService(this.card.type);
    }

    get subjects() {
        return this.votingCardService.getSubjectsForPlayer(this.card);
    }
    
    get formBackgroundCSS() {
        return ColorUtils.getBackground100CSS(this.cardColor);
    }

    get cardColor()  {
        return CardUtils.getCardColor(this.card);
    }
    
    constructor(
        private store: Store,
        private cardServiceFactory: CardServiceFactory,
        private responseDataDataService: ResponseDataDataService,
        private responseDataSourceService: ResponseDataSourceService,
        private changeDetectorRef: ChangeDetectorRef,
        private roomService: RoomService,
        private gameService: GameService
    ) {
        super();
    }

    ngAfterViewInit(): void {
        this.store.select(InformationState.response)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(r => {
                const response = this.votingCardService.castResponse(r ?? null);

                if (!!response) {
                    this.votingForm.controls["votedSubjectIDs"].disable();
                    this.votingForm.controls["votedSubjectIDs"].setValue(response.votedSubjectIDs[0]);
                    
                    this.votingForm.controls["votedSubjectIDs"].updateValueAndValidity();
                    this.changeDetectorRef.detectChanges();
                }
        });
    }

    votingForm: FormGroup = new FormGroup({
        votedSubjectIDs: new FormControl({ value: null, disabled: false }, Validators.required)
    });

    getCardTitle() {
        return this.votingCardTranslationService.getCardTitle(this.card);
    }

    getCardText() {
        return this.votingCardTranslationService.getCardText(
            this.card,
            this.store.selectSnapshot(RoomState.players),
            this.round.playerIds,
            this.store.selectSnapshot(RoomState.specificPlayerId)
        );
    }
    
    identifySubject(index: number, subject: NewSubject) {
        return subject.ID;
    }

    userResponded() {
      return this.responseDataDataService.userResponded(this.round.id);
    }

    submit(skipped: boolean = false) {
        if (skipped) this.votingForm.controls["votedSubjectIDs"].setValue(null);
        this.votingForm.controls["votedSubjectIDs"].disable();
        this.votingForm.controls["votedSubjectIDs"].updateValueAndValidity();

        const votedSubjectIDs = this.votingForm.controls["votedSubjectIDs"].value ?
            [this.votingForm.controls["votedSubjectIDs"].value] :
            [];

        const response = this.votingCardService.createResponse(
            votedSubjectIDs,
            this.round.id
        );
    
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