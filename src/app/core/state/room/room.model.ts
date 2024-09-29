import { Room } from "../../models/interfaces/logic/room/Room";

export interface RoomStateModel {
    /**
     * Id's of room that user is currently in
     */
    roomConnectionData: RoomConnectionData;
    // ToDO: Make optional
    room: Room;
}

export interface RoomConnectionData {
    roomId?: string;
    userId?: string;
}