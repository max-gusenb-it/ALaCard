import { DynamicRoundData, VotingResponse } from "@features";

export interface DynamicVotingRoundData<S> extends DynamicRoundData {
    responses: VotingResponse<S>[];
    /** Player Id who payed to display voting results */
    payToDisplayPlayerId: string;
}