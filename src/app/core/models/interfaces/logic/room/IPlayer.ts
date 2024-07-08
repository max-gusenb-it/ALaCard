import { IFirestoreBase } from "../IFirestoreBase";

/**
 * Player that is saved in room. Holds the same information as user but in more minimalistic way
 *
 * @export
 * @interface IPlayer
 * @typedef {IPlayer}
 * @extends {IFirestoreBase}
 */
export interface IPlayer extends IFirestoreBase {
    state: EPlayerState;
}

export enum EPlayerState {
    active,
    inactive
}