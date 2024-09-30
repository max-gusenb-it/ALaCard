import { FirestoreBase } from "../firestore-base";
import { Round } from "./round/round";

export interface IngameData extends FirestoreBase {
    rounds: Round[];
    playedCardIndexes: number[]; 
}