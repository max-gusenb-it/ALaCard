export namespace GroupUtils {
    // export function getResultsForQuizCardGroup(card: QuizCard, results: TopicVotingResult[], votingGroup: VotingCardGroup | QuizCardGroup) {
    //     if (results.length == 0) return [];
    //     switch(votingGroup) {
    //         case(QuizCardGroup.QuizCard_AllTargets):
    //         case(QuizCardGroup.QuizCard_NoTargets): {
    //             let isTarget = votingGroup === QuizCardGroup.QuizCard_AllTargets;
    //             const targetSubjectIDs = card.subjects
    //                 .filter(s => s.isTarget)
    //                 .map(s => s.id!);
    //             return results
    //                 .filter(r => targetSubjectIDs.includes(r.subjectID) === isTarget);
    //         }
    //         default: {
    //             return getResultsForGroup(results, votingGroup);
    //         }
    //     }
    // }
}