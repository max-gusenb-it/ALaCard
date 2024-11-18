import { PlayerVotingGroup } from "../../../../enums/logic/cards/player-voting-card/player-voting-group";

export interface PlayerVotingSipConfig {
    group: PlayerVotingGroup;
    // ToDo: Add sip direction (distribute)
}