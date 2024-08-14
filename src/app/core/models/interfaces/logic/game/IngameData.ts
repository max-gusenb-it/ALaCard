import { Round } from "./Round";

export interface IngameData {
    rounds: Round[];
    playedCardIndexes: number[]; 
}