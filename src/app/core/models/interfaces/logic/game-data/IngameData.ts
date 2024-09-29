import { FirestoreBase } from "../FirestoreBase";
import { Round } from "./round/Round";

export interface IngameData extends FirestoreBase {
    rounds: Round[];
    playedCardIndexes: number[]; 
}