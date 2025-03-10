import { Injectable } from "@angular/core";
import { IngameDataDataService, ResponseDataDataService, RoomState, StaticRoundDataDataService, VotingCardService } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, NewPlayerVotingCard, NewSubject } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class NewPlayerVotingCardService extends VotingCardService<NewPlayerVotingCard> {
    
    constructor(
        override store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    override getSubjects(card: Card): NewSubject[] {
        const playerVotingCard = this.castCard(card);
        let players = this.store.selectSnapshot(RoomState.players);
        if (playerVotingCard.settings.selfVoteDisabled) {
            players = players.filter(p => p.id !== this.store.selectSnapshot(AuthenticationState.userId));
        }
        return players
            .map(p => {
                return {
                    title: p.username,
                    ID: p.id
                }
            });
    }
}