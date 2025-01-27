import { CardType } from "../../../enums";
import { CardSettings } from "./card-settings";
import { FollowUpCard } from "./FollowUpCard";

export interface Card {
    text: string;
    type: CardType;
    settings?: CardSettings;
    followUpCard?: FollowUpCard;
}