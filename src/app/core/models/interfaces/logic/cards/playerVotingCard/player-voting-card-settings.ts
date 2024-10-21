import { CardSettings } from "../card-settings";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVoteDisabled: boolean;
    isAnonymous: boolean;
    payToDisplay: boolean;
    // ToDo: add sip config
}