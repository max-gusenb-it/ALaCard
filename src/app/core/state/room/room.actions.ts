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
        constructor(public roomId: string) {}
    }

    export class SetRoom {
        static readonly type = '[Room State] Set room';
        constructor(public room: IRoom) {}
    }
}