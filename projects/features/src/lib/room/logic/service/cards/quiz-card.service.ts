import { Injectable } from "@angular/core";
import { CardUtils, DynamicRoundData, IngameDataDataService, PollCardResultConfig, PollCardService, PollResult, ResponseDataDataService, SipResult, StaticRoundDataDataService } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Card, PollCard, QuizCard, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class QuizCardService extends PollCardService<QuizCard, PollCardResultConfig> {
    
    constructor(
        store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    override getResults(dynamicRoundData: DynamicRoundData, card: Card): PollResult[] {
        let results = super.getResults(dynamicRoundData, card);
        const quizCard = this.castCard(card);

        let missingSubjectResultIDs = [...quizCard.subjects.map(s => s.id!)]
            .filter(sID => !results.find(r => r.subjectId === sID));
        const missingSubjectResults = missingSubjectResultIDs.map(sID => {
            return {
                subjectId: sID,
                playerIds: [],
                votes: 0
            } as PollResult
        })
        results = [
            ...missingSubjectResults,
            ...results
        ];

        // Set for sorting performance boost
        const targetSubjectIDsSet = new Set(
            quizCard.subjects
                .filter(s => s.isTarget)
                .map(s => s.id!)
        ); 
        results = results.sort((a, b) => {
            // 1. Sort by correctness
            const aIsTarget = targetSubjectIDsSet.has(a.subjectId);
            const bIsTarget = targetSubjectIDsSet.has(b.subjectId);
        
            if (aIsTarget && !bIsTarget) return -1; // a comes first
            if (!aIsTarget && bIsTarget) return 1;  // b comes first
        
            // 2. If both are correct or both are incorrect, sort by votes (descending)
            return b.votes - a.votes;
        });

        return results;
    }

    override getResultsHeading(results: PollResult[], card: Card): string {
        const castedCard: QuizCard = this.castCard(card);
        const targetSubjects = castedCard.subjects.filter(s => s.isTarget);
        return Utils.addComaToStringArray(
            targetSubjects.map(s => s.title),
            true
        );
    }
}