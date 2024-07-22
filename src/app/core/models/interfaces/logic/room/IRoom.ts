import { IFirestoreBase } from "../IFirestoreBase";
import { IPlayer } from "./IPlayer";

export interface IRoom extends IFirestoreBase {
    name: string;
    description: string;
    settings: {
      singleDeviceMode: boolean;
    };
    /**
     * Players that joined the room. Saved this way so players can be updated individually
     */
    players: {
      [key: string]: IPlayer;
    };
}