import { Response } from "./response";

export interface TopicVotingResponse extends Response {
    votedSubjectIds: number[];
}