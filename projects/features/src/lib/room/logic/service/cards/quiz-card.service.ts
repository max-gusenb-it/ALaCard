import { Injectable } from "@angular/core";
import { CardUtils, DynamicRoundData, IngameDataDataService, TopicVotingCardResultConfig, TopicVotingResult, ResponseDataDataService, StaticRoundDataDataService, TopicVotingCardService } from "@features";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { Card, TopicVotingCard, QuizCard, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class QuizCardService extends TopicVotingCardService<QuizCard, TopicVotingCardResultConfig> {
    
    constructor(
        store: Store,
        responseDataDataService: ResponseDataDataService,
        ingameDataDataService: IngameDataDataService,
        staticRoundDataDataService: StaticRoundDataDataService,
        translateService: TranslateService
    ) {
        super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
    }

    override getResults(dynamicRoundData: DynamicRoundData, card: Card): TopicVotingResult[] {
        let results = super.getResults(dynamicRoundData, card);
        const quizCard = this.castCard(card);

        let missingSubjectResultIDs = [...quizCard.subjects.map(s => s.id!)]
            .filter(sID => !results.find(r => r.subjectId === sID));
        const missingSubjectResults = missingSubjectResultIDs.map(sID => {
            return {
                subjectId: sID,
                playerIds: [],
                votes: 0
            } as TopicVotingResult
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

    override getResultsHeading(results: TopicVotingResult[], card: Card): string {
        const castedCard: QuizCard = this.castCard(card);
        const targetSubjects = castedCard.subjects.filter(s => s.isTarget);
        return Utils.addComaToStringArray(
            targetSubjects.map(s => s.title),
            true
        );
    }
    
    // const pollCard = this.castCard(card);
    // let results: PollResult[] = [];

    // if (pollCard.settings?.sipConfig?.specificSipSubjectId !== undefined) {
    //     results = this.getResults(dynamicRoundData, card)
    //         .filter(r => r.subjectId === pollCard.settings!.sipConfig!.specificSipSubjectId);
    // }

    // return results
    //     .map(r => {
    //         return r.playerIds.map(pId => {
    //             return {
    //                 playerId: pId,
    //                 sips: defaultCardSips,
    //                 distribute: pollCard.settings?.sipConfig?.distribute !== undefined ?
    //                     pollCard.settings?.sipConfig?.distribute :
    //                     this.defaultPollVotingDistribution
    //             } as SipResult
    //         });
    //     })
    //     .flat();
}