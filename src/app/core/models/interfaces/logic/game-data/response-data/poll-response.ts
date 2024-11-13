import { Response } from "./response";

export interface PollResponse extends Response {
    votedTopicIds: number[];
}