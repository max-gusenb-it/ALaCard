import { IFirestoreBase } from "../IFirestoreBase";
import { IPlayer } from "./IPlayer";

export interface IRoom extends IFirestoreBase {
    name: string;
    description: string;
    players: {
      [key: string]: IPlayer;
    };
}