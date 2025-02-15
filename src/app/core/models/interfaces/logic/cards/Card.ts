import { CardType } from "../../../enums";
import { CardSettings } from "./card-settings";
import { FollowUpCardConfig } from "./follow-up-card-config";

export interface Card {
    text: string;
    type: CardType;
    settings?: CardSettings;
    followUpCardConfig?: FollowUpCardConfig;
}