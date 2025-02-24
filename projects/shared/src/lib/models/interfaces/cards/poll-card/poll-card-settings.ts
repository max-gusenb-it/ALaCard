import { CardSettings } from "../card-settings";
import { PollSipConfig } from "../../../../../../../features/src/lib/room/models/interfaces/cards/results/poll-card/poll-sip-config";

export interface PollCardSettings extends CardSettings {
    sipConfig?: PollSipConfig;
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}