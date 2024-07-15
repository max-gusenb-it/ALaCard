import { IRoom } from "../../models/interfaces";

export namespace Room {
    
    /**
     * Creates room and saves room id to user 
     *
     * @export
     * @class CreateRoom
     * @typedef {CreateRoom}
     */
    export class CreateRoom {
        static readonly type = '[No-Room] Create room';
        constructor(public name: string, public description: string) {}
    }

    export class JoinRoom {
        static readonly type = '[Home] Join room';
        constructor(public roomId: string, public userId?: string) {}
    }

    export class SetRoom {
        static readonly type = '[Room State] Set room';
        /**
         * Creates an instance of SetRoom.
         *
         * @constructor
         * @param {IRoom} room
         * @param {?string} [userId] Optional id of user that owns the room. If null, room is owned by currently signed in user
         */
        constructor(public room: IRoom, public userId?: string) {}
    }

    export class LeaveRoom {
        static readonly type = '[Room] Leave room';
        constructor() {}
    }
}