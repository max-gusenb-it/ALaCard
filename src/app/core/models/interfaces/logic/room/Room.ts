import { Deck } from "../deck/Deck";
import { GameSettings } from "../deck/GameSettings";
import { FirestoreBase } from "../FirestoreBase";
import { Player } from "./Player";
import { RoomSettings } from "./RoomSettings";

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
    game?: {
      deck: Deck;
      settings: GameSettings;
    }
}