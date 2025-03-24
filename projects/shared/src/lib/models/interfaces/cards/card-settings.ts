import { FollowUpCardConfig } from "@shared";
import { Color } from "../../types/color";

export interface CardSettings {
    order?: number;
    
    customTitle?: string;
    customColor?: Color;

    drinkingCard?: boolean;
    delaySipText?: boolean;
    followUpCardConfig?: FollowUpCardConfig;
}