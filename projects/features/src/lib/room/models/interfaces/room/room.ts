import { FirestoreBase } from "@shared";
import { Game, RoomSettings, Player } from "@features";

export interface Room extends FirestoreBase {
    name: string;
    settings: RoomSettings;
    /**
     * Players that joined the room. Saved this way so players can be updated individually
     */
    players: {
      [key: string]: Player;
    };
    game: Game | null;
}