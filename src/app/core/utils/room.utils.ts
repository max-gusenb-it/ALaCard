import { environment } from "src/environments/environment";
import { Player, Room, User } from "../models/interfaces";
import { UserUtils } from "./user.utils";
import { PlayerState } from "../models/enums";
import { Store } from "@ngxs/store";
import { AuthenticationState, RoomState } from "../state";
import { roomsRef, usersRef } from "../constants/firestoreReferences";

export namespace RoomUtils {    
    /**
     * Returns collection reference for a room
     *
     * @export
     * @param {Store} store
     * @param {string} creatorId if the method is called at a point, where the room does not exist yet, the id of the room creator has to be provided
     * @returns {string}
     */
    export function getRoomCollectionRef(store: Store, creatorId?: string) {
        const room = store.selectSnapshot(RoomState.room);
        if (!!!room && !!!creatorId) {
            // Currently joined in no room
            creatorId = store.selectSnapshot(AuthenticationState.userid);
        }
        if (!!!creatorId && !!room) {
            creatorId = getRoomCreator(room).id;
        }
        return `${usersRef}/${creatorId}/${roomsRef}`;
    }

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
        let playersArray = Object.values(room.players);
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
    
    export function getRoomAdmin(room: Room) : Player {
        if (room.settings.otherAdmin) {
            return Object.values(room.players).sort((p1, p2) => p1.joinOrder - p2.joinOrder)
                .filter(p => p.state === PlayerState.active)[0];
        } else {
            return getRoomCreator(room);
        }
    }
 
    export function getRoomCreator(room: Room) : Player {
        return Object.values(room.players).sort((p1, p2) => p1.joinOrder - p2.joinOrder)[0];
    }

    export function generateJoinLink(room: Room) : string {
        const creator = getRoomCreator(room);
        if (environment.production) {
            return `https://alacard-de849.web.app/room/${creator.id}-${room.id}`;
        } else {
            return `http://localhost:8100/room/${creator.id}-${room.id}`;
        }
    }

    export function convertRoomToOfflineMode(room: Room, host: User) {
        // Create copy of room -> objects returned from selectSnapshot can't be changed
        let newRoom = {
            ...room,
            players: {...room.players},
            settings: {...room.settings}
        } as Room;
        newRoom.players = {
            [host.id!]: UserUtils.exportUserToPlayer(host, 0)
        };
        newRoom.settings.singleDeviceMode = true;
        return newRoom;
    }
}