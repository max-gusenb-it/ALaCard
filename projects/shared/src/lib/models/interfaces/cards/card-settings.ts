import { Color } from "../../types/color";

export interface CardSettings {
    order?: number;
    customTitle?: string;
    customColor?: Color;
    drinkingCard?: boolean;
    // ToDo: Display in stats
    drinkingText?: string;
    // ToDo - structure
    delaySipText?: boolean;
}