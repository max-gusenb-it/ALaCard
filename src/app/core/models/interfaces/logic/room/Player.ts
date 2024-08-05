/**
 * Player that is saved in room. Holds the same information as user but in more minimalistic way
 *
 * @export
 * @interface Player
 * @typedef {Player}
 */
export interface Player {
    id: string;
    state: PlayerState;
    username: string;
    profilePicture: string;
    joinOrder: number;
}

export enum PlayerState {
    active,
    inactive,
    left
}