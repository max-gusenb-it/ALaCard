import { Color } from "../../types/color";

export interface CardSettings {
    order?: number;
    customTitle?: string;
    customColor?: Color;
    drinkingCard?: boolean;
    // ToDo - structure
    delaySipText?: boolean;
}