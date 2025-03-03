import { CardSettings, VotingCardSipConfig } from "@shared";

export interface VotingCardSettings extends CardSettings {
    isAnonymous: boolean;
    payToDisplay: boolean;
    multipSelect: boolean;
    sipConfig?: VotingCardSipConfig;
}