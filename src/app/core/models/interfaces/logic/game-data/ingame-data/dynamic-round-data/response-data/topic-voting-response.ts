import { Response } from "./response";

export interface TopicVotingResponse extends Response {
    votedTopicId: number[];
}