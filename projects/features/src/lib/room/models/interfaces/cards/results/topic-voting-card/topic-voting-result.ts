import { Result } from "../result";

// ToDo - structure: rename id properties

export interface TopicVotingResult extends Result {
    /** Id of Subject that has been voted */
    subjectId: number;
    votes: number;
    /** Id's of Players that have voted */
    playerIds: string[];
}