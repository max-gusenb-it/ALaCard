import { ResultConfig } from "../result-config";
import { TopicVotingGroup } from "@shared";

export interface TopicVotingResultConfig extends ResultConfig {
    group: TopicVotingGroup;
}