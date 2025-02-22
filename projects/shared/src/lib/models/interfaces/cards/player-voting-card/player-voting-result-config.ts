import { ResultConfig } from "../result-config";
import { PlayerVotingGroup } from "@shared";

// ToDo - structure: think about moving result config

export interface PlayerVotingResultConfig extends ResultConfig {
    group: PlayerVotingGroup;
    // ToDo: Add sip direction (distribute)
}