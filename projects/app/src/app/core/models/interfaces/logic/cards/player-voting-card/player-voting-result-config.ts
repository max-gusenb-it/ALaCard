import { PlayerVotingGroup } from "../../../../enums/logic/cards/player-voting-card/player-voting-group";
import { ResultConfig } from "../result-config";

export interface PlayerVotingResultConfig extends ResultConfig {
    group: PlayerVotingGroup;
    // ToDo: Add sip direction (distribute)
}