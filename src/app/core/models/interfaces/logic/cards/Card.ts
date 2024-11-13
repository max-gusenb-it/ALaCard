import { CardType } from "../../../enums";
import { CardSettings } from "./card-settings";

// ToDo: Add overwrite color and title
export interface Card {
    text: string;
    type: CardType;
    settings?: CardSettings;
}