import { TopicVotingGroup } from "projects/app/src/app/core/models/enums";
import { ResultConfig } from "../result-config";

export interface TopicVotingResultConfig extends ResultConfig {
    group: TopicVotingGroup;
}