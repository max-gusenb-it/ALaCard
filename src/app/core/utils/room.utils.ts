import { IPlayer, IRoom, IUser } from "../models/interfaces";
import { EPlayerState } from "../models/interfaces/logic/room/IPlayer";
import { UserUtils } from "./user.utils";

export namespace RoomUtils {
    
    /**
     * Generates a newPlayer for a room from a given user. When the player is already added in the room and active null is returned
     *
     * @export
     * @param {IRoom} room room that the player should be added to
     * @param {IUser} user user from which the player should be created
     * @returns {(IPlayer | null)} Player that should be added to the room. Null, when the player is already in active state in the room
     */
    export function generatePlayerForRoom(room: IRoom, user: IUser) : IPlayer | null {
        // check if player already exists
        let newPlayer: IPlayer;
        let existingPlayer: IPlayer | undefined;
        let playersArray = Object.values(room.players);
        if (playersArray.length !== 0) {
            existingPlayer = playersArray.find(p => p.id === user.id);
        }
        if (!!existingPlayer) {
            // if player state is already active do nothing
            if (existingPlayer.state !== EPlayerState.active) {
                newPlayer = existingPlayer;
                newPlayer.state = EPlayerState.active;
            } else {
                return null;
            }
        } else {
            newPlayer = UserUtils.exportUserToPlayer(user, playersArray.length !== 0 ? playersArray.length : 0);
        }
        return newPlayer;
    }

    
    /**
     * Generates a player that looks like he left the room from an existing room and an player id
     *
     * @param {IRoom} room 
     * @param {string} playerId
     * @returns {(IPlayer | null)} The updated player or null if the player is not found
     */
    export function generateLeftPlayer(room: IRoom, playerId: string) : IPlayer | null {
        if (!!room.players[playerId]) {
            return {
                ...room.players[playerId],
                state: EPlayerState.left
            };
        }
        return null;
    }
}