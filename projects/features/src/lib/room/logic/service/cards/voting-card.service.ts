import { Injectable } from "@angular/core";
import { CardService, defaultCardSips, DynamicRoundData, DynamicVotingRoundData, GroupUtils, IngameDataDataService, Response, ResponseDataDataService, Result, SipResult, StaticRoundDataDataService, VotingResult, VotingResponse, playerVotingCardSkipValue } from "@features";
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

    get defaultVotingGroup() {
        return VotingCardGroup.MostVoted;
    }

    get defaultVotingDistribution() {
        return true;
    }
    
    constructor(
        private store: Store,
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

    createResponse(votedSubjectIDs: string[], roundID: number) : VotingResponse {
        const skipped = !votedSubjectIDs;
        return {
            playerId: this.store.selectSnapshot(AuthenticationState.userId)!,
            skipped: skipped,
            votedSubjectIDs: !skipped ? votedSubjectIDs : [this.skipValue],
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
    
    override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
        const votingCard = this.castCard(card);
    
        const filteredResults = GroupUtils.getResultsForGroup(
            this.getResults(dynamicRoundData)
                .filter(r => r.subjectID !== this.skipValue),
            this.defaultVotingGroup
        );

        return filteredResults
            .map(r => {
                return r.playerIDs.map(pID => {
                    return {
                        playerId: pID,
                        sips: defaultCardSips,
                        distribute: votingCard.settings?.sipConfig?.distribute !== undefined ? 
                            votingCard.settings?.sipConfig?.distribute : 
                            this.defaultVotingDistribution
                    } as SipResult
                });
            })
            .flat();
    }
    
    getTopResults(results: Result[]): VotingResult[] {
        const votingResults = results
            .map(r => this.castResult(r));
        return votingResults
            .filter(r => r.votes === votingResults[0].votes && r.subjectID !== this.skipValue);
    }
}