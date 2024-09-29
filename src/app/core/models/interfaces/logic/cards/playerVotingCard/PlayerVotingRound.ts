import { Round } from "../../game-data/round/Round";
import { PlayerVotingResponse } from "../../response-data/PlayerVotingResponse";

export interface PlayerVotingRound extends Round {
    responses: PlayerVotingResponse[];
}