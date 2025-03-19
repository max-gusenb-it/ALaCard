import { Injectable } from "@angular/core";
import { CardState, DynamicRoundData, PollCardService, QuizCardState, RoomState, VotingResult } from "@features";
import { Card, QuizCard, Utils } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

@Injectable({
    providedIn: 'root'
})
export class QuizCardService extends PollCardService<QuizCard> {

    override get defaultGroup() : string {
        return QuizCardGroup.QuizCard_AllTargets;
    }


    override getNextCardState(card: Card, cardState: string): string | undefined {
        switch(cardState) {
            case(CardState.Card_Initial):
            case(CardState.Card_FollowUp_Initial): {
                const singleDeviceModeActive = this.store.selectSnapshot(RoomState.singleDeviceModeActive);
                if (singleDeviceModeActive) {
                    return QuizCardState.QuizCard_Targets;
                } else if (Utils.isNumberDefined(card.settings?.followUpCardConfig?.followUpCardID)) {
                    return CardState.Card_FollowUp_Initial;
                }
                return;
            };
            default: return super.getNextCardState(card, cardState);
        }
    }

    override getResults(dynamicRoundData: DynamicRoundData, card: Card): VotingResult[] {
        let results = super.getResults(dynamicRoundData, card);
        const quizCard = this.castCard(card);

        let missingSubjectResultIDs = [...quizCard.subjects.map(s => s.ID!)]
            .filter(sID => !results.find(r => r.subjectID === sID));
        const missingSubjectResults = missingSubjectResultIDs.map(sID => {
            return {
                subjectID: sID,
                playerIDs: [],
                votes: 0
            } as VotingResult
        })
        results = [
            ...missingSubjectResults,
            ...results
        ];

        // Set for sorting performance boost
        const targetSubjectIDsSet = new Set(
            quizCard.subjects
                .filter(s => s.isTarget)
                .map(s => s.ID!)
        ); 
        results = results.sort((a, b) => {
            // 1. Sort by correctness
            const aIsTarget = targetSubjectIDsSet.has(a.subjectID);
            const bIsTarget = targetSubjectIDsSet.has(b.subjectID);
        
            if (aIsTarget && !bIsTarget) return -1; // a comes first
            if (!aIsTarget && bIsTarget) return 1;  // b comes first
        
            // 2. If both are correct or both are incorrect, sort by votes (descending)
            return b.votes - a.votes;
        });

        return results;
    }

    override getResultsForGroup(results: VotingResult[], groupString: string, card: Card): VotingResult[] {
        if (results.length == 0) return [];
        switch(groupString) {
            case(QuizCardGroup.QuizCard_NotAllTargets):
            case(QuizCardGroup.QuizCard_AllTargets): {
                const quizCard = this.castCard(card);
                let isTarget = groupString === QuizCardGroup.QuizCard_AllTargets;
                const targetSubjectIDs = quizCard.subjects
                    .filter(s => s.isTarget)
                    .map(s => s.ID!);
                return results
                    .filter(r => targetSubjectIDs.includes(r.subjectID) === isTarget);
            }
            default: return super.getResultsForGroup(results, groupString, card);
        }
    }
    
}