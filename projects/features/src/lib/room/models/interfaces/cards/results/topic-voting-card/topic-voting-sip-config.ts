import { PollSipConfig } from "../poll-card/poll-sip-config";
import { TopicVotingResultConfig } from "./topic-voting-result-config";

export interface TopicVotingSipConfig extends PollSipConfig {
    resultConfig?: TopicVotingResultConfig;
}