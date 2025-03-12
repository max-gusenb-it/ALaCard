import { Injectable } from "@angular/core";
import { CardState, DynamicRoundData, PollCardService, QuizCardStates, VotingResult } from "@features";
import { Card, QuizCard } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

@Injectable({
    providedIn: 'root'
})
export class QuizCardService extends PollCardService<QuizCard> {

    override get defaultGroup() : string {
        return QuizCardGroup.QuizCard_AllTargets;
    }

    override hasFollowUpCard(card: Card, cardState: string): boolean {
        if (cardState === CardState.Card_Initial) {
            return true;
        } else {
            return false;
        }
    }

    override getNextCardState(): string {
        return QuizCardStates.QuizCard_Targets;
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
            default: return super.getResultsForGroup(results, groupString);
        }
    }
    
}