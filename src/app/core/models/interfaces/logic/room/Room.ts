import { FirestoreBase } from "../FirestoreBase";
import { Player } from "./Player";

export interface Room extends FirestoreBase {
    name: string;
    description: string;
    settings: {
      singleDeviceMode: boolean;
    };
    /**
     * Players that joined the room. Saved this way so players can be updated individually
     */
    players: {
      [key: string]: Player;
    };
}