import { environment } from "projects/app/src/environments/environment";
import { Player, Room } from "../models/interfaces";
import { UserUtils } from "./user.utils";
import { offlinePlayerProfilePicture } from "../constants/user";
import { PlayerState, User } from "@shared";

export namespace RoomUtils {
    /**
     * Generates a newPlayer for a room from a given user. When the player is already added in the room and active null is returned
     *
     * @export
     * @param {Room} room room that the player should be added to
     * @param {User} user user from which the player should be created
     * @returns {(Player | null)} Player that should be added to the room. Null, when the player is already in active state in the room
     */
    export function generatePlayerForRoom(room: Room, user: User) : Player | null {
        // check if player already exists
        let newPlayer: Player;
        let existingPlayer: Player | undefined;
        let playersArray = mapPlayersToArray(room.players);
        if (playersArray.length !== 0) {
            existingPlayer = playersArray.find(p => p.id === user.id);
        }
        if (!!existingPlayer) {
            if (existingPlayer.state !== PlayerState.active) {
                // set state to active and update user information 
                newPlayer = existingPlayer;
                newPlayer.state = PlayerState.active;
                if(newPlayer.username != user.username) newPlayer.username = user.username;
                if(newPlayer.profilePicture != user.profilePicture) newPlayer.profilePicture = user.profilePicture;
            } else {
                // if player state is already active do nothing
                return null;
            }
        } else {
            newPlayer = UserUtils.exportUserToPlayer(user, playersArray.length !== 0 ? playersArray.length : 0);
        }
        return newPlayer;
    }

    export function generateOfflinePlayerForRoom(room: Room, playerName: string) : Player {
        const playersArray = mapPlayersToArray(room.players);
        return {
            id: playersArray.length.toString(),
            joinOrder: playersArray.length !== 0 ? playersArray.length : 0,
            profilePicture: offlinePlayerProfilePicture,
            state: PlayerState.offline,
            username: playerName
        }
    }
    
    /**
     * Generates a player that looks like he left the room from an existing room and an player id
     *
     * @param {Room} room 
     * @param {string} playerId
     * @returns {(Player | null)} The updated player or null if the player is not found
     */
    export function generateLeftPlayer(room: Room, playerId: string) : Player | null {
        if (!!room.players[playerId]) {
            return {
                ...room.players[playerId],
                state: PlayerState.left
            };
        }
        return null;
    }

    export function mapPlayersToArray(players: { [key: string]: Player }) {
        return Object.values(players).sort((p1, p2) => p1.joinOrder - p2.joinOrder);
    }

    export function mapPlayersToObject(players: Player[]) : { [key: string]: Player } {
        return players.reduce((accumulator, player) => {
            return {...accumulator, [player.id]: player};
        }, {});
    }

    export function isPlayerActive(player: Player) {
        return player.state === PlayerState.active || player.state === PlayerState.offline;
    }
 
    export function getRoomCreator(room: Room) : Player {
        return mapPlayersToArray(room.players)[0];
    }

    export function generateJoinLink(room: Room) : string {
        const creator = getRoomCreator(room);
        if (environment.production) {
            return `https://alacard.org/room/${creator.id}-${room.id}`;
        } else {
            return `http://localhost:8100/room/${creator.id}-${room.id}`;
        }
    }

    export function removePlayersFromRoom(room: Room, host: User) {
        // Create copy of room -> objects returned from selectSnapshot can't be changed
        let newRoom = {
            ...room,
            players: {...room.players},
            settings: {...room.settings}
        } as Room;
        newRoom.players = {
            [host.id!]: UserUtils.exportUserToPlayer(host, 0)
        };
        return newRoom;
    }
}