import { DefaultGameSetting } from "./default-game-setting";
import { StyleSettings } from "./style-settings";
import { Card } from "@shared";

export interface Deck {
    name: string;
    description: string;
    icon: string;

    cards: Card[];
    groundRules?: string[];
    styleSettings?: StyleSettings;

    flags?: string[];
    requiredPlayers: {
        playerCount: number;
        isExactCount: boolean;
    };
    defaultGameSettings?: DefaultGameSetting[];
}