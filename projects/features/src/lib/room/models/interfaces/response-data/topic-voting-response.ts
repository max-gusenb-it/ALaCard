import { Response } from "./response";

export interface TopicVotingResponse extends Response {
    votedSubjectIDs: number[];
}