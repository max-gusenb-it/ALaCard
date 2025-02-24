import { TopicVotingCardResultConfig } from "@shared";

export interface TopicVotingSipConfig {
    resultConfig: TopicVotingCardResultConfig;
    specificSipSubjectId?: number;
    distribute?: boolean;
}