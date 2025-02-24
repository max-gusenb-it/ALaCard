import { PollCardSettings } from "../poll-card/poll-card-settings";
import { TopicVotingSipConfig } from "../../../../../../../features/src/lib/room/models/interfaces/cards/results/topic-voting-card/topic-voting-sip-config";

export interface TopicVotingCardSettings extends PollCardSettings {
    sipConfig?: TopicVotingSipConfig;
}