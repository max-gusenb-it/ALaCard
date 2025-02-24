import { VotingCardGroup } from "@shared";
import { ResultConfig } from "../result-config";

export interface TopicVotingCardResultConfig extends ResultConfig {
    group: VotingCardGroup;
}