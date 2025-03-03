import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { CardUtils, ColorUtils, RoomState, Round, VotingCardTranslationService, VotingCardService, CardServiceFactory, IngameDataDataService, VotingResult, playerVotingCardSkipValue } from "@features";
import { Store } from "@ngxs/store";
import { AngularLifecycle, Card, VotingCard } from "@shared";
import { takeUntil } from "rxjs";

@Component({
    selector: 'it-voting-stats',
    templateUrl: './it-voting-stats.component.html'
})
export class ItVotingStatsComponent extends AngularLifecycle implements AfterViewInit {
    @Input() card: Card;
    @Input() round: Round;
        
    get votingCardService() {
        return <VotingCardService<VotingCard>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get votingCardTranslationService() {
        return <VotingCardTranslationService<VotingCard>>this.cardServiceFactory.getCardTranslationService(this.card.type);
    }

    get skipValue() {
        return playerVotingCardSkipValue;
    }
  
    get statsBackgroundCSS() {
        return ColorUtils.getBackground100CSS(this.cardColor)
    }
    
    get cardColor()  {
        return CardUtils.getCardColor(this.card);
    }

    get drinkingGame() {
        return this.store.selectSnapshot(RoomState.gameSettings)?.drinkingGame;
    }

    constructor(
        private store: Store,
        private cardServiceFactory: CardServiceFactory,
        private ingameDataDataService: IngameDataDataService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        super();
    }

    results: VotingResult[];

    ngAfterViewInit(): void {
        this.ingameDataDataService.getDynamicRoundData$()
            .pipe(takeUntil(this.destroyed$))
            .subscribe(dynamicRoundData => {
                if (!!!dynamicRoundData) return;
                this.results = this.votingCardService.getResults(dynamicRoundData, this.card);
                this.changeDetectorRef.detectChanges();
            });
    }

    getCardTitle() {
        return this.votingCardTranslationService.getCardTitle(this.card);
    }

    getCardText() {
        return this.votingCardTranslationService.getCardText(
            this.votingCardService.castCard(this.card),
            this.store.selectSnapshot(RoomState.players),
            this.round.playerIds,
            this.store.selectSnapshot(RoomState.specificPlayerId)
        );
    }

    getResultsHeading() {
        return this.votingCardTranslationService.getResultsHeading(
            this.votingCardService.getSubjects(this.card),
            this.votingCardService.getTopResults(this.results)
        );
    }

    getResultTitle(result: VotingResult, resultIndex: number) {
        return this.votingCardTranslationService.getResultTitle(
            result,
            resultIndex,
            this.votingCardService.getSubjects(this.card),
            this.votingCardService.getTopResults(this.results)
        );
    }
}