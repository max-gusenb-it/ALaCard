import { FirestoreBase } from "@shared";
import { FollowUpCardSchedule } from "./follow-up-card-schedule";
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
    followUpCardSchedules: FollowUpCardSchedule[];
}