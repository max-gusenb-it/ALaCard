import { FirestoreBase } from "../FirestoreBase";
import { Player } from "./Player";
import { RoomSettings } from "./RoomSettings";
import { Game } from "../game/Game";

export interface Room extends FirestoreBase {
    name: string;
    description: string;
    settings: RoomSettings;
    /**
     * Players that joined the room. Saved this way so players can be updated individually
     */
    players: {
      [key: string]: Player;
    };
    game?: Game;
}