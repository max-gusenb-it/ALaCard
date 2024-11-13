import { Card } from "../cards/card";
import { DefaultGameSetting } from "./default-game-setting";

export interface Deck {
    name: string;
    description: string;
    icon: string;
    cards: Card[];
    groundRules?: string[];
    
    defaultGameSettings?: DefaultGameSetting[];
}