import { Response } from "../../logic/game-data/ingame-data/dynamic-round-data/response-data/response";

export interface RoundInformation {
    roundId: number;
    cardClicked: boolean;
    response?: Response;
};