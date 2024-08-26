import { GameState } from "../../../enums";
import { Deck } from "./Deck";
import { GameSettings } from "./GameSettings";

export interface Game {
    comparyValue: number;
    state: GameState;
    deck: Deck;
    settings: GameSettings;
};