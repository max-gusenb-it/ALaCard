import { TopicVotingGroup } from "src/app/core/models/enums";
import { ResultConfig } from "../result-config";

export interface TopicVotingResultConfig extends ResultConfig {
    group: TopicVotingGroup;
    specificSubjectId?: number
    // ToDo: Add sip direction (distribute)
}