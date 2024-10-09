import { CardType } from "../../../enums";
import { CardSettings } from "./card-settings";

export interface Card {
    text: string;
    type: CardType;
    settings?: CardSettings;
}