import { DynamicRoundData, VotingResponse } from "@features";

export interface DynamicVotingRoundData extends DynamicRoundData {
    responses: VotingResponse[];
    /** Player Id who payed to display voting results */
    payToDisplayPlayerId: string;
}