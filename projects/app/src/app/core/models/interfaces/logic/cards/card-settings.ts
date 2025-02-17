import { Color } from "projects/app/src/app/core/constants/color";

export interface CardSettings {
    order?: number;
    drinkingCard?: boolean;
    customTitle?: string;
    customColor?: Color;
}