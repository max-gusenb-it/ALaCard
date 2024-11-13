import { Response } from "./response";

export interface TopicVotingResponse extends Response {
    votedTopicIds: number[];
}