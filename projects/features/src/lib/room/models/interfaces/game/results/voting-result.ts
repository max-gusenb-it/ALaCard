import { Result } from "@features";

export interface VotingResult extends Result{
    /** Id of Player that has been voted */
    subjectID: string;
    votes: number;
    /** Id's of Players that have voted */
    playerIDs: string[];
}