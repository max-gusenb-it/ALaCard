import { TopicVotingResult, VotingResult } from "@features";
import { QuizCard, VotingCardGroup } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

export namespace GroupUtils {
    export function getResultsForGroup<S>(results: VotingResult<S>[], votingGroup: VotingCardGroup) {
        if (results.length == 0) return [];
        switch(votingGroup) {
            case(VotingCardGroup.MostVoted):
            case(VotingCardGroup.LeastVoted): {
                let votes = 0;
                if (votingGroup === VotingCardGroup.MostVoted) {
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
            case(QuizCardGroup.AllTargets):
            case(QuizCardGroup.NoTargets): {
                let isTarget = votingGroup === QuizCardGroup.AllTargets;
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