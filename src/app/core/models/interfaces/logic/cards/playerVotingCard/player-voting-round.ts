import { Round } from "../../game-data/round/round";
import { PlayerVotingResponse } from "../../response-data/player-voting-response";

export interface PlayerVotingRound extends Round {
    responses: PlayerVotingResponse[];
}