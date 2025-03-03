import { Response } from "@features";

export interface OldVotingResponse<S> extends Response {
    votedSubjectIDs: S[];
}