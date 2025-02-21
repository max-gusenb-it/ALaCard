import { CardSettings } from "./card-settings";
import { FollowUpCardConfig } from "./follow-up-card-config";
import { CardType } from "@shared";

export interface Card {
    text: string;
    type: CardType;
    settings?: CardSettings;
    followUpCardConfig?: FollowUpCardConfig;
    /** Special ID to track follow up Cards */
    followUpCardID?: number;
}