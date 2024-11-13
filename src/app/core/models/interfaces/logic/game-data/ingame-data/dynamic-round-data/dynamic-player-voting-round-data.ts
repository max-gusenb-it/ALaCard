import { PlayerVotingResponse } from "./response-data/player-voting-response";
import { DynamicRoundData } from "./dynamic-round-data";

export interface DynamicPlayerVotingRoundData extends DynamicRoundData {
    responses: PlayerVotingResponse[];
    /** Player Id who payed to display voting results */
    payToDisplayPlayerId: string;
}