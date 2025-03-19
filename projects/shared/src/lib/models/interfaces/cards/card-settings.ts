import { Color } from "../../types/color";

export interface CardSettings {
    order?: number;
    customTitle?: string;
    customColor?: Color;
    drinkingCard?: boolean;
    sipText?: string;
    delaySipText?: boolean;
}