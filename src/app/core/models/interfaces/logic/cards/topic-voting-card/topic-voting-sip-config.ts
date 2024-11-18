import { TopicVotingGroup } from "src/app/core/models/enums";

export interface TopicVotingSipConfig {
    group: TopicVotingGroup;
    // ToDo: Add sip direction (distribute)
}