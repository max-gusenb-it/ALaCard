import { Response } from "../../logic/game-data/response-data/response";

export interface RoundInformation {
    roundId: number;
    cardClicked: boolean;
    response?: Response;
};