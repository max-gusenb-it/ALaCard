import { Response } from "@features";

export interface VotingResponse<S> extends Response {
    votedSubjectIDs: S[];
}