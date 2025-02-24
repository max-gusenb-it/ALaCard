import { TopicVotingCardResultConfig } from "@features";

export interface PollSipConfig {
    resultConfig: TopicVotingCardResultConfig;
    specificSipSubjectId?: number;
    distribute?: boolean;
}