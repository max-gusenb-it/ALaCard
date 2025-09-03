import { Injectable } from "@angular/core";
import { CardService, DynamicRoundData, DynamicVotingRoundData, IngameDataDataService, Response, ResponseDataDataService, Result, StaticRoundDataDataService, VotingResult, VotingResponse, votingCardSkipValue } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { AuthenticationState, Card, Subject, VotingCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class VotingCardService<C extends VotingCard> extends CardService<C, VotingResponse, DynamicVotingRoundData, VotingResult> {

    get skipValue() {
        return votingCardSkipValue;
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

    getSubjects(card?: Card): Subject[] {
        return [];
    }

    getSubjectsForPlayer(card?: Card): Subject[] {
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
    
    getTopResults(results: Result[]): VotingResult[] {
        if (!results) return [];
        const votingResults = results
            .map(r => this.castResult(r));
        return votingResults
            .filter(r => r.votes === votingResults[0].votes && r.subjectID !== this.skipValue);
    }
}