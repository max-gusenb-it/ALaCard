// import { Injectable } from "@angular/core";
// import { defaultCardSips, DynamicRoundData, IngameDataDataService, ResponseDataDataService, StaticRoundDataDataService, TopicVotingCardService, SipResult, TopicVotingResult } from "@features";
// import { TranslateService } from "@ngx-translate/core";
// import { Store } from "@ngxs/store";
// import { Card, QuizCard, Utils } from "@shared";

// @Injectable({
//     providedIn: 'root'
// })
// export class QuizCardService extends TopicVotingCardService<QuizCard> {
    
//     constructor(
//         store: Store,
//         responseDataDataService: ResponseDataDataService,
//         ingameDataDataService: IngameDataDataService,
//         staticRoundDataDataService: StaticRoundDataDataService,
//         translateService: TranslateService
//     ) {
//         super(store, responseDataDataService, ingameDataDataService, staticRoundDataDataService, translateService);
//     }

//     override getResults(dynamicRoundData: DynamicRoundData, card: Card): TopicVotingResult[] {
//         let results = super.getResults(dynamicRoundData, card);
//         const quizCard = this.castCard(card);

//         let missingSubjectResultIDs = [...quizCard.subjects.map(s => s.id!)]
//             .filter(sID => !results.find(r => r.subjectID === sID));
//         const missingSubjectResults = missingSubjectResultIDs.map(sID => {
//             return {
//                 subjectID: sID,
//                 playerIDs: [],
//                 votes: 0
//             } as TopicVotingResult
//         })
//         results = [
//             ...missingSubjectResults,
//             ...results
//         ];

//         // Set for sorting performance boost
//         const targetSubjectIDsSet = new Set(
//             quizCard.subjects
//                 .filter(s => s.isTarget)
//                 .map(s => s.id!)
//         ); 
//         results = results.sort((a, b) => {
//             // 1. Sort by correctness
//             const aIsTarget = targetSubjectIDsSet.has(a.subjectID);
//             const bIsTarget = targetSubjectIDsSet.has(b.subjectID);
        
//             if (aIsTarget && !bIsTarget) return -1; // a comes first
//             if (!aIsTarget && bIsTarget) return 1;  // b comes first
        
//             // 2. If both are correct or both are incorrect, sort by votes (descending)
//             return b.votes - a.votes;
//         });

//         return results;
//     }

//     override getResultsHeading(results: TopicVotingResult[], card: Card): string {
//         const castedCard: QuizCard = this.castCard(card);
//         const targetSubjects = castedCard.subjects.filter(s => s.isTarget);
//         return Utils.addComaToStringArray(
//             targetSubjects.map(s => s.title),
//             true
//         );
//     }

//     override calculateSipResults(card: Card, dynamicRoundData: DynamicRoundData): SipResult[] {
//         const quizCard = this.castCard(card);
//         let results: TopicVotingResult[] = this.getResults(dynamicRoundData, card)
//             .filter(r => quizCard.subjects.find(s => s.id! === r.subjectID)!.isTarget);
    
//         return results
//             .map(r => {
//                 return r.playerIDs.map(pId => {
//                     return {
//                         playerId: pId,
//                         sips: defaultCardSips,
//                         distribute: true
//                     } as SipResult
//                 });
//             })
//             .flat();
//     }
    
// }