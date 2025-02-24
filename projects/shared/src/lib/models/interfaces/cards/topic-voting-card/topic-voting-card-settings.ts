import { TopicVotingSipConfig } from "@features";
import { CardSettings } from "../card-settings";

export interface TopicVotingCardSettings extends CardSettings {
    sipConfig?: TopicVotingSipConfig;
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}