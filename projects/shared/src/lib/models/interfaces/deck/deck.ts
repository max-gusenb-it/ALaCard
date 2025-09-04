import { DefaultGameSetting } from "./default-game-setting";
import { GroundRule } from "./ground-rule";
import { StyleSettings } from "./style-settings";
import { Card, CardType } from "@shared";

export interface Deck {
    name: string;
    description: string;
    icon: string;

    groundRules?: GroundRule[];
    cards: Card[];
    defaultSipTexts?: { [key in CardType]?: string };

    styleSettings?: StyleSettings;
    flags?: string[];
    requiredPlayers: {
        playerCount: number;
        isExactCount: boolean;
    };
    defaultGameSettings?: DefaultGameSetting[];
}