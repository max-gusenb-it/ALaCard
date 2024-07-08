import { IRoom } from "../../models/interfaces/logic/room/IRoom";

export interface RoomStateModel {
    /**
     * Id of room that user is currently in
     */
    roomId: string;
    room: IRoom;
}