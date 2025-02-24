import { PlayerVotingGroup, ResultConfig } from "@shared";

export interface PlayerVotingResultConfig extends ResultConfig {
    group: PlayerVotingGroup;
    // ToDo: Add sip direction (distribute)
}