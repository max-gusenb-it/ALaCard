import { CardType } from "../../../enums";
import { CardSettings } from "./CardSettings";

export interface Card {
    type: CardType;
    settings: CardSettings;
}