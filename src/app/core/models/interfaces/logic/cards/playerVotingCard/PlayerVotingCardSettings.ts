import { CardSettings } from "../CardSettings";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVotAllowed: boolean;
    isAnonymous: boolean;
    // ToDo: add pay to display
}