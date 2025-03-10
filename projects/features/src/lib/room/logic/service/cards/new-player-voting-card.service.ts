import { Injectable } from "@angular/core";
import { defaultCardSips, DynamicRoundData, IngameDataDataService, ResponseDataDataService, RoomState, SipResult, StaticRoundDataDataService, VotingCardService, VotingResult } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, NewPlayerVotingCard, NewSubject, PlayerVotingCardGroup, VotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class NewPlayerVotingCardService extends VotingCardService<NewPlayerVotingCard> {
    
    override get defaultVotingGroup() : string {
        return PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer;
    }

    override get defaultVotingDistribution(): boolean {
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

    override getSubjects(card: Card): NewSubject[] {
        let players = this.store.selectSnapshot(RoomState.players);
        return players
            .map(p => {
                return {
                    title: p.username,
                    ID: p.id
                }
            });
    }

    override getSubjectsForPlayer(card: Card): NewSubject[] {
        const playerVotingCard = this.castCard(card);
        
        let subjects = this.getSubjects(card);

        if (playerVotingCard.settings.selfVoteDisabled) {
            subjects = subjects.filter(s => s.ID !== this.store.selectSnapshot(AuthenticationState.userId));
        }
        return subjects;
    }

    override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const playerVotingCard = this.castCard(card);

        const group = playerVotingCard.settings.sipConfig?.group ?? this.defaultVotingGroup;
        if (group in VotingCardGroup) super.calculateSipResults(card, dynamicRoundData);

        const filteredResults = this.getResultsForGroup(
            this.getResults(dynamicRoundData)
                .filter(r => r.subjectID !== this.skipValue),
            group
        );

        return filteredResults
            .map(r => {
                return {
                    distribute: playerVotingCard.settings.sipConfig?.distribute ?? this.defaultVotingDistribution,
                    playerId: r.subjectID,
                    sips: filteredResults.length === 1 ? defaultCardSips * 2 : defaultCardSips
                } as SipResult
            });
    }

    override getResultsForGroup(results: VotingResult[], groupString: string): VotingResult[] {
        if (results.length == 0) return [];
        switch(groupString) {
            case(PlayerVotingCardGroup.PlayerVotingCard_MostVotedPlayer): {
                return this.getTopResults(results);
            }
            default: return super.getResultsForGroup(results, groupString);
        }
    }
}