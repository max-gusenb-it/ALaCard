import { Component, Input } from "@angular/core";
import { CardUtils, ColorUtils, RoomState, Round, VotingCardTranslationService, CardTranslationService, VotingCardService, CardServiceFactory } from "@features";
import { Store } from "@ngxs/store";
import { Card, VotingCard } from "@shared";

@Component({
    selector: 'it-voting-stats',
    templateUrl: './it-voting-stats.component.html'
})
export class ItVotingStatsComponent {
    @Input() card: Card;
    @Input() round: Round;
        
    get votingCardService() {
        return <VotingCardService<VotingCard>>this.cardServiceFactory.getCardService(this.card.type);
    }

    get votingCardTranslationService() {
        return <VotingCardTranslationService<VotingCard>>this.cardServiceFactory.getCardTranslationService(this.card.type);
    }
  
    get statsBackgroundCSS() {
        return ColorUtils.getBackground100CSS(this.cardColor)
    }
    
    get cardColor()  {
        return CardUtils.getCardColor(this.card);
    }

    constructor(
        private store: Store,
        private cardServiceFactory: CardServiceFactory
    ) { }

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
            this.votingCardService.castCard(this.card),
            []
        );
    }
}