import { VotingResult } from "@features";
import { VotingCardGroup } from "@shared";

export namespace GroupUtils {
    export function getResultsForGroup<S>(results: VotingResult<S>[], votingGroup: VotingCardGroup) {
        switch(votingGroup) {
            case(VotingCardGroup.MostVoted):
            case(VotingCardGroup.LeastVoted): {
                if (results.length != 0) {
                    let votes = 0;
                    if (votingGroup === VotingCardGroup.MostVoted) {
                        votes = results[0].votes;
                    } else {
                        votes = results[results.length - 1].votes;
                    }
                    return results
                        .filter(r => r.votes === votes)
                }
            }
        }
        return [];
    }
}