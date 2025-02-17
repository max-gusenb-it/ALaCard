import { Result } from "../result";

export interface PollResult extends Result {
    /** Id of Subject that has been voted */
    subjectId: number;
    votes: number;
    /** Id's of Players that have voted */
    playerIds: string[];
}