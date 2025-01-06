import { Response } from "../../logic/game-data/response-data/response";

export interface RoundInformation {
    roundId: number;
    activeSubCardIndex: number;
    response?: Response;
};