import { Result } from "@shared";

// ToDo - structure: think about moving results to feature?

export interface VotingResult<S> extends Result{
    /** Id of Player that has been voted */
    subjectID: S;
    votes: number;
    /** Id's of Players that have voted */
    playerIds: string[];
}