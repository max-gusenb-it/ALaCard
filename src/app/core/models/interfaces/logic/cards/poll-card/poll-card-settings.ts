import { CardSettings } from "../card-settings";

export interface PollCardSettings extends CardSettings {
    // ToDo: Keep in mind => quiz card is basically the same
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}