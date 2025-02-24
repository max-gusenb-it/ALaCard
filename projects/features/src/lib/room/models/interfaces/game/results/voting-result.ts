import { Result } from "@features";

export interface VotingResult<S> extends Result{
    /** Id of Player that has been voted */
    subjectID: S;
    votes: number;
    /** Id's of Players that have voted */
    playerIds: string[];
}