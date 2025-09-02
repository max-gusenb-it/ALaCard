import { CardSettings } from "./card-settings";
import { CardType, Color } from "@shared";

export interface Card {
    title?: string;
    text: string;
    sipText?: string;
    type: CardType;
    color?: Color;
    settings?: CardSettings;
    /** Special ID to track follow up Cards */
    followUpCardID?: number;
}