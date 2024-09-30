import { CardType } from "../../../enums";
import { CardSettings } from "./card-settings";

export interface Card {
    type: CardType;
    settings: CardSettings;
}