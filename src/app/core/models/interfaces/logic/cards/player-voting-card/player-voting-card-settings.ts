import { CardSettings } from "../card-settings";
import { PlayerVotingSipConfig } from "./player-voting-sip-config";

export interface PlayerVotingCardSettings extends CardSettings {
    selfVoteDisabled: boolean;
    isAnonymous: boolean;
    payToDisplay: boolean;
    sipConfig?: PlayerVotingSipConfig;
}