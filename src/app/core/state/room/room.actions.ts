import { Deck, IngameData, Room } from "../../models/interfaces";

export namespace RoomActions {
    
    /**
     * Creates room and saves room id to user 
     *
     * @export
     * @class CreateRoom
     * @typedef {CreateRoom}
     */
    export class CreateRoom {
        static readonly type = '[No-Room] CreateRoom';
        constructor(public name: string, public description: string) {}
    }

    export class JoinRoom {
        static readonly type = '[Home] JoinRoom';
        constructor(public roomId: string, public userId?: string) {}
    }

    export class SetRoom {
        static readonly type = '[Room State] SetRoom';
        /**
         * Creates an instance of SetRoom.
         *
         * @constructor
         * @param {Room} room
         * @param {?string} [userId] Optional id of user that owns the room. If null, room is owned by currently signed in user
         */
        constructor(public room: Room, public userId?: string) {}
    }

    export class LeaveRoom {
        static readonly type = '[Room] LeaveRoom';
        constructor() {}
    }

    export class StartGame {
        static readonly type = '[Start-Game-Modal] StartGame';
        constructor(public deck: Deck) {};
    }

    export class ContinueToGame {
        static readonly type = '[Game-Rules] ContinueToGame';
        constructor(public ingameData: IngameData) {};
    }
}