import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngxs/store";
import { Round, CardServiceFactory, VotingCardService, ColorUtils, CardUtils, CardTranslationService, RoomState, ResponseDataDataService } from "@features";
import { Card, NewSubject, VotingCard, } from "@shared";

@Component({
    selector: 'it-voting-form',
    templateUrl: './it-voting-form.component.html'
})
export class ItVotingFormComponent {
    @Input() card: Card;
    @Input() round: Round;
    
    get votingCardService() {
        return <VotingCardService<VotingCard, number | string>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get subjects() {
        return this.votingCardService.getSubjects(this.card);
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
        private cardTranslationService: CardTranslationService,
        private responseDataDataService: ResponseDataDataService
    ) {}

    votingForm: FormGroup = new FormGroup({
        votedSubjectIDs: new FormControl({ value: null, disabled: false }, Validators.required)
    });

    getCardTitle() {
        return this.cardTranslationService.getCardTitle(this.card);
    }

    getCardText() {
        return this.cardTranslationService.getCardText(
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

        // console.log (this.votingCardService.createResponse(
        //     votedSubjectIDs,
        //     this.round.id
        // ));
    }
}