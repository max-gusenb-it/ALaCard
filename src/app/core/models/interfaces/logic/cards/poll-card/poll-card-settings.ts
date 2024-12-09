import { CardSettings } from "../card-settings";
import { PollSipConfig } from "./poll-sip-config";

export interface PollCardSettings extends CardSettings {
    sipConfig?: PollSipConfig;
    chooseMultiple?: boolean;
    isAnonymous?: boolean;
}