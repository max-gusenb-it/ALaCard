import { IRoom } from "../../models/interfaces/logic/room/IRoom";

export interface RoomStateModel {
    /**
     * Id's of room that user is currently in
     */
    roomConnectionData: RoomConnectionData;
    room: IRoom;
}

export interface RoomConnectionData {
    roomId: string;
    userId?: string;
}