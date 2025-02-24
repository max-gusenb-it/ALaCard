import { TopicVotingCardResultConfig } from "@features";

export interface TopicVotingSipConfig {
    resultConfig: TopicVotingCardResultConfig;
    specificSipSubjectId?: number;
    distribute?: boolean;
}