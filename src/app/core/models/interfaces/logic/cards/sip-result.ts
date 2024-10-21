import { Result } from "./result";

export interface SipResult extends Result {
    playerId: string;
    distribute: boolean;
    sips: number;
}