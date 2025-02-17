import { Color } from "src/app/core/constants/color";

export interface CardSettings {
    order?: number;
    drinkingCard?: boolean;
    customTitle?: string;
    customColor?: Color;
}