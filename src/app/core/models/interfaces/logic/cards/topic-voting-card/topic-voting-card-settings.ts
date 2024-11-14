import { PollCardSettings } from "../poll-card/poll-card-settings";

export interface TopicVotingCardSettings extends PollCardSettings {
    settings?: PollCardSettings;
}