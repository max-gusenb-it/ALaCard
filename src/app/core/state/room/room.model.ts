import { Room } from "../../models/interfaces/logic/room/room";

export interface RoomStateModel {
    /**
     * Id's of room that user is currently in
     */
    roomConnectionData: RoomConnectionData | null;

    
    /**
     * Room that user has joined
     *
     * @type {(Room | null)}
     */
    room: Room | null;
}

export interface RoomConnectionData {
    roomId: string;
    creatorId: string;
}