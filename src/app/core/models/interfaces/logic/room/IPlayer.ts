/**
 * Player that is saved in room. Holds the same information as user but in more minimalistic way
 *
 * @export
 * @interface IPlayer
 * @typedef {IPlayer}
 */
export interface IPlayer {
    id: string;
    state: EPlayerState;
    username: string;
    profilePicture: string;
    joinOrder: number;
}

export enum EPlayerState {
    active,
    inactive,
    left
}