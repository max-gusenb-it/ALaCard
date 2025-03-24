import { CardSettings } from "./card-settings";
import { CardType } from "@shared";

export interface Card {
    text: string;
    sipText?: string;
    type: CardType;
    settings?: CardSettings;
    /** Special ID to track follow up Cards */
    followUpCardID?: number;
}