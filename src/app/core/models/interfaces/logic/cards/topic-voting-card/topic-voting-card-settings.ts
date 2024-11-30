import { PollCardSettings } from "../poll-card/poll-card-settings";
import { TopicVotingResultConfig } from "./topic-voting-result-config";

export interface TopicVotingCardSettings extends PollCardSettings {
    sipConfig?: TopicVotingResultConfig;
}