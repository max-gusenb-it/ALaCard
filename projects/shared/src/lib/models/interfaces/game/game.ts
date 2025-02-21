import { Deck } from "./deck";
import { GameSettings } from "./game-settings";
import { GameState } from "@shared";

export interface Game {
    compareValue: number;
    state: GameState;
    deck: Deck;
    settings: GameSettings;
};