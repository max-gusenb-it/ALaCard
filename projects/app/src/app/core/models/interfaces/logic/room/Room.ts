import { FirestoreBase, Game } from "@shared";
import { Player } from "./player";
import { RoomSettings } from "./room-settings";

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
    game: Game | null;
}