import { Injectable } from "@angular/core";
import { CardService, defaultCardSips, DynamicRoundData, DynamicVotingRoundData, IngameDataDataService, Response, ResponseDataDataService, Result, SipResult, StaticRoundDataDataService, VotingResult, VotingResponse, playerVotingCardSkipValue, defaultPayToDisplaySips } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, NewSubject, VotingCard, VotingCardGroup } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class VotingCardService<C extends VotingCard> extends CardService<C, VotingResponse, DynamicVotingRoundData, VotingResult> {

    get skipValue() {
        return playerVotingCardSkipValue;
    }

    get defaultVotingGroup() : string {
        return VotingCardGroup.VotingCard_MostVotedSubject;
    }

    get defaultVotingDistribution() {
        return true;
    }
    
    constructor(
        protected store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    getSubjects(card?: Card): NewSubject[] {
        return [];
    }

    getSubjectsForPlayer(card?: Card): NewSubject[] {
        return this.getSubjects(card);
    }

    createResponse(votedSubjectIDs: string[], roundID: number) : VotingResponse {
        const skipped = !votedSubjectIDs || votedSubjectIDs.length <= 0;
        return {
            playerId: this.store.selectSnapshot(AuthenticationState.userId)!,
            skipped: skipped,
            votedSubjectIDs: !skipped ? votedSubjectIDs : [],
            roundId: roundID  
        } as VotingResponse;
    }
    
    override createDynamicRoundData(roundId: number, responses: Response[]): DynamicVotingRoundData {
        const votingResponses = this.castResponses(responses);
        let drd : DynamicVotingRoundData = super.createDynamicRoundData(roundId);
        drd.responses = votingResponses;
        return drd;
    }
    
    override getResults(dynamicRoundData: DynamicRoundData, card?: Card): VotingResult[] {
        let results: VotingResult[] = [];
        const dynamicVotingRoundData = this.castDynamicRoundData(dynamicRoundData);
        dynamicVotingRoundData.responses.forEach(response => {
            if (response.skipped) response.votedSubjectIDs = [this.skipValue]
            response.votedSubjectIDs.forEach(subjectID => {
                let resultIndex = results.findIndex(r => r.subjectID === subjectID);
                if (resultIndex === -1) {
                    results.push({
                        subjectID: subjectID,
                        playerIDs: [response.playerId],
                        votes: 1
                    })
                } else {
                    const foundResults = results[resultIndex];
                    results[resultIndex] = {
                        subjectID: subjectID,
                        playerIDs: [
                            ...foundResults.playerIDs,
                            response.playerId
                        ],
                        votes: foundResults.votes + 1
                    }
                }
            });
        });
        
        results = results.sort((r1, r2) => {
            if (r1.subjectID === this.skipValue) return 1;
            if (r2.subjectID === this.skipValue) return -1;
            return r2.votes - r1.votes;
        });
        return results;
    }

    override getSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        let sipResults = this.calculateSipResults(card, dynamicRoundData);

        sipResults = this.addPayToDisplaySipResult(sipResults, dynamicRoundData);

        return sipResults.sort((s1, s2) => {
            if (s1.playerId === this.store.selectSnapshot(AuthenticationState.userId)) return -1;
            if (s2.playerId !== this.store.selectSnapshot(AuthenticationState.userId)) return 1;
            return 0;
        });
    }

    addPayToDisplaySipResult(sipResults: SipResult[], dynamicRoundData: DynamicRoundData) {
        const dynamicPollRoundData = this.castDynamicRoundData(dynamicRoundData);
        if (!!dynamicPollRoundData.payToDisplayPlayerId) {
            const payToWinUserIndex = sipResults.findIndex(sr => sr.playerId === dynamicPollRoundData.payToDisplayPlayerId && !sr.distribute);
            if (payToWinUserIndex !== -1) {
                sipResults[payToWinUserIndex].sips += defaultPayToDisplaySips;
            } else {
                sipResults = [
                    ...sipResults,
                    {
                        playerId: dynamicPollRoundData.payToDisplayPlayerId,
                        sips: defaultPayToDisplaySips,
                        distribute: false
                    }
                ];
            }
        }
        return sipResults;
    }
    
    override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const votingCard = this.castCard(card);
    
        const filteredResults = this.getResultsForGroup(
            this.getResults(dynamicRoundData)
                .filter(r => r.subjectID !== this.skipValue),
            votingCard.settings?.sipConfig?.group ?? this.defaultVotingGroup
        );

        return filteredResults
            .map(r => {
                return r.playerIDs.map(pID => {
                    return {
                        playerId: pID,
                        sips: defaultCardSips,
                        distribute: votingCard.settings?.sipConfig?.distribute ?? this.defaultVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }

    getResultsForGroup(results: VotingResult[], groupString: string) {
        if (results.length == 0) return [];
        switch(groupString) {
            case(VotingCardGroup.VotingCard_MostVotedSubject):
            case(VotingCardGroup.VotingCard_LeastVotedSubject): {
                let votes = 0;
                if (groupString === VotingCardGroup.VotingCard_MostVotedSubject) {
                    votes = results[0].votes;
                } else {
                    votes = results[results.length - 1].votes;
                }
                return results
                    .filter(r => r.votes === votes);
            }
            default: return [];
        }
    }
    
    getTopResults(results: Result[]): VotingResult[] {
        if (!results) return [];
        const votingResults = results
            .map(r => this.castResult(r));
        return votingResults
            .filter(r => r.votes === votingResults[0].votes && r.subjectID !== this.skipValue);
    }
}