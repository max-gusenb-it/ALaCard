import { Response } from "./response";

export interface PollResponse extends Response {
    votedSubjectIds: number[];
}