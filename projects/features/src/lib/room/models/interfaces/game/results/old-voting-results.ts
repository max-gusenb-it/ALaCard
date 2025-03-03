import { Result } from "@features";

export interface OldVotingResult<S> extends Result{
    /** Id of Player that has been voted */
    subjectID: S;
    votes: number;
    /** Id's of Players that have voted */
    playerIDs: string[];
}