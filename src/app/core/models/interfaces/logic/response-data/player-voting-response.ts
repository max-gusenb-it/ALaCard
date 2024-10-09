import { Response } from "./response";

export interface PlayerVotingResponse extends Response {
    votedPlayerId: string;
}