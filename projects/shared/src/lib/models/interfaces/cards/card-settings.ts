import { Color } from "../../types/color";

export interface CardSettings {
    order?: number;
    drinkingCard?: boolean;
    customTitle?: string;
    customColor?: Color;
}