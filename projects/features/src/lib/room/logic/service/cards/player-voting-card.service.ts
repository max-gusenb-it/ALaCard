import { Injectable } from "@angular/core";
import { IngameDataDataService, ResponseDataDataService, RoomState, StaticRoundDataDataService, VotingCardService } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, PlayerVotingCard, Subject } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends VotingCardService<PlayerVotingCard> {

    constructor(
        override store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    override getSubjects(card: Card): Subject[] {
        let players = this.store.selectSnapshot(RoomState.players);
        return players
            .map(p => {
                return {
                    title: p.username,
                    ID: p.id
                }
            });
    }

    override getSubjectsForPlayer(card: Card): Subject[] {
        const playerVotingCard = this.castCard(card);
        
        let subjects = this.getSubjects(card);

        if (playerVotingCard.settings?.selfVoteDisabled) {
            subjects = subjects.filter(s => s.ID !== this.store.selectSnapshot(AuthenticationState.userId));
        }
        return subjects;
    }
}