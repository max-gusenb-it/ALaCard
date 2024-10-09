import { FirestoreBase } from "../../firestore-base";
import { Round } from "./round/round";

/**
 * Data that does not change during a round
 *
 * @export
 * @interface StaticRoundData
 * @typedef {StaticRoundData}
 * @extends {FirestoreBase}
 */
export interface StaticRoundData extends FirestoreBase {
    round: Round | null;
    playedCardIndexes: number[];
}