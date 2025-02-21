import { PollCardSettings } from "../poll-card/poll-card-settings";
import { TopicVotingSipConfig } from "./topic-voting-sip-config";

export interface TopicVotingCardSettings extends PollCardSettings {
    sipConfig?: TopicVotingSipConfig;
}