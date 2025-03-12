import { CardSettings, VotingCardSipConfig } from "@shared";

export interface VotingCardSettings extends CardSettings {
    isAnonymous: boolean;
    // ToDo: multipSelect: boolean;
    sipConfig?: VotingCardSipConfig;
}