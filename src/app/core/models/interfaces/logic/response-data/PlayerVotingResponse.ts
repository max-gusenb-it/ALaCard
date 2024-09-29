import { Response } from "./Response";

export interface PlayerVotingResponse extends Response {
    votedPlayerId: string;
}