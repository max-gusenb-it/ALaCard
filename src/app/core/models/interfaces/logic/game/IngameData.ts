import { FirestoreBase } from "../FirestoreBase";
import { Round } from "./Round";

export interface IngameData extends FirestoreBase {
    rounds: Round[];
    playedCardIndexes: number[]; 
}