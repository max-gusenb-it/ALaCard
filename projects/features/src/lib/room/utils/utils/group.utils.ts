import { OldVotingResult, TopicVotingResult, VotingResult } from "@features";
import { QuizCard, VotingCardGroup } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

export namespace GroupUtils {
    export function getResultsForGroup<S>(results: OldVotingResult<S>[], votingGroup: VotingCardGroup) {
        if (results.length == 0) return [];
        switch(votingGroup) {
            case(VotingCardGroup.VotingCard_MostVotedSubject):
            case(VotingCardGroup.VotingCard_LeastVotedSubject): {
                let votes = 0;
                if (votingGroup === VotingCardGroup.VotingCard_MostVotedSubject) {
                    votes = results[0].votes;
                } else {
                    votes = results[results.length - 1].votes;
                }
                return results
                    .filter(r => r.votes === votes);
            }
        }
    }

    export function getResultsForQuizCardGroup(card: QuizCard, results: TopicVotingResult[], votingGroup: VotingCardGroup | QuizCardGroup) {
        if (results.length == 0) return [];
        switch(votingGroup) {
            case(QuizCardGroup.QuizCard_AllTargets):
            case(QuizCardGroup.QuizCard_NoTargets): {
                let isTarget = votingGroup === QuizCardGroup.QuizCard_AllTargets;
                const targetSubjectIDs = card.subjects
                    .filter(s => s.isTarget)
                    .map(s => s.id!);
                return results
                    .filter(r => targetSubjectIDs.includes(r.subjectID) === isTarget);
            }
            default: {
                return getResultsForGroup(results, votingGroup);
            }
        }
    }
}