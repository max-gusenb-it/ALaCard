import { Round } from "./round";
import { PlayerVotingResponse } from "../../response-data/player-voting-response";

export interface PlayerVotingRound extends Round {
    responses: PlayerVotingResponse[];
}