import { Result } from "../result";

export interface PlayerVotingResult extends Result {
    /** Id of Player that has been voted */
    votedPlayerId: string;
    votes: number;
    /** Id's of Players that have voted */
    playerIds: string[];
}