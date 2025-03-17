import { Injectable } from "@angular/core";
import { defaultCardSips, DynamicRoundData, IngameDataDataService, ResponseDataDataService, RoomState, SipResult, StaticRoundDataDataService, VotingCardService, VotingResult } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, PlayerVotingCard, Subject, PlayerVotingCardGroup, VotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingCardService extends VotingCardService<PlayerVotingCard> {
    
    override get defaultGroup() : string {
        return PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer;
    }

    override get defaultDistribution(): boolean {
        return false;
    }

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

    override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const playerVotingCard = this.castCard(card);

        const group = playerVotingCard.settings?.sipConfig?.group ?? this.defaultGroup;
        if (group in VotingCardGroup) super.calculateSipResults(card, dynamicRoundData);

        const results = this.getResults(dynamicRoundData)
            .filter(r => r.subjectID !== this.skipValue);

        const filteredResults = this.getResultsForGroup(
            results,
            group,
            card
        );

        return filteredResults
            .map(r => {
                return {
                    distribute: playerVotingCard.settings?.sipConfig?.distribute ?? this.defaultDistribution,
                    playerId: r.subjectID,
                    sips: results.length > 1 ? defaultCardSips : defaultCardSips * 2
                } as SipResult
            });
    }

    override getResultsForGroup(results: VotingResult[], groupString: string, card: Card): VotingResult[] {
        if (results.length == 0) return [];
        switch(groupString) {
            case(PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer): {
                return this.getTopResults(results);
            }
            default: return super.getResultsForGroup(results, groupString, card);
        }
    }
}