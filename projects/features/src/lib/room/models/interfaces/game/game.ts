import { GameState, GameSettings } from "@features";
import { Deck } from "@shared";

export interface Game {
    compareValue: number;
    state: GameState;
    deck: Deck;
    settings: GameSettings;
};