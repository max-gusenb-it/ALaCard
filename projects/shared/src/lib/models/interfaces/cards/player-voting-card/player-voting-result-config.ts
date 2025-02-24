import { ResultConfig, VotingCardGroup } from "@shared";

export interface PlayerVotingResultConfig extends ResultConfig {
    group: VotingCardGroup;
    // ToDo: Add sip direction (distribute)
}