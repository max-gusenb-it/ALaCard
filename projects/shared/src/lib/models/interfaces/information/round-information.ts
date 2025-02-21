import { Response } from "@shared";

export interface RoundInformation {
    roundId: number;
    cardAnimationSkipped: boolean;
    response?: Response;
};