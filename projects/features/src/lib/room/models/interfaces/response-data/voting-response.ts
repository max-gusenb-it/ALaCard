import { Response } from "@features";

export interface VotingResponse extends Response {
    votedSubjectIDs: string[];
}