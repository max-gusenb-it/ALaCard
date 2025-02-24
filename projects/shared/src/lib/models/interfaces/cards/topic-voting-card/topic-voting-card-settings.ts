import { TopicVotingSipConfig, CardSettings } from "@shared";

export interface TopicVotingCardSettings extends CardSettings {
    sipConfig?: TopicVotingSipConfig;
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}