import { Response } from "@features";

export interface RoundInformation {
    roundId: number;
    cardAnimationSkipped: boolean;
    response?: Response;
};