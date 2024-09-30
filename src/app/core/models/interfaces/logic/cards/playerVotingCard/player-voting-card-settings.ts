import { CardSettings } from "../card-settings";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVotAllowed: boolean;
    isAnonymous: boolean;
    // ToDo: add pay to display
}