import { GameState } from "../../../enums";
import { Deck } from "./deck";
import { GameSettings } from "./game-settings";

export interface Game {
    compareValue: number;
    state: GameState;
    deck: Deck;
    settings: GameSettings;
};