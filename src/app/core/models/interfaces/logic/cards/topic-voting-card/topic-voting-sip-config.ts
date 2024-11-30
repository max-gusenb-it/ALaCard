import { TopicVotingResultConfig } from "./topic-voting-result-config";

export interface TopicVotingSipConfig {
    resultConfig?: TopicVotingResultConfig;
    specificSipSubjectId?: number;
    distribute?: boolean;
}