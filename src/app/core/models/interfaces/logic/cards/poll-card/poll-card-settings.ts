import { CardSettings } from "../card-settings";

export interface PollCardSettings extends CardSettings {
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}