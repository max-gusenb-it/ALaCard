import { CardSettings } from "@shared";

export interface VotingCardSettings extends CardSettings {
    isAnonymous: boolean;
    payToDisplay: boolean;
}