import { ResultConfig } from "../result-config";
import { PlayerVotingGroup } from "@shared";

export interface PlayerVotingResultConfig extends ResultConfig {
    group: PlayerVotingGroup;
    // ToDo: Add sip direction (distribute)
}