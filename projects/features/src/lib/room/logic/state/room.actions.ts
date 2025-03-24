import { Game, Room } from "@features";

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
        constructor(public name: string) {}
    }

    export class JoinRoom {
        static readonly type = '[Home] JoinRoom';
        constructor(public creatorId: string, public roomId: string) {}
    }

    export class SetRoom {
        static readonly type = '[Room State] SetRoom';
        /**
         * Creates an instance of SetRoom.
         *
         * @constructor
         * @param {string | null} creatorId
         * @param {Room | null} room
         */
        constructor(public creatorId: string | null, public room: Room | null) {}
    }

    export class AddOfflinePlayer {
        static readonly type = '[Add-Offline-Player-Bottom-Sheet] AddOfflinePlayer';
        constructor(public playerName: string) {};
    }

    export class LeaveRoom {
        static readonly type = '[Room] LeaveRoom';
        constructor() {}
    }

    export class SetGame {
        static readonly type = '[RoomState] SetGame';
        constructor(public game: Game) {};
    }
}