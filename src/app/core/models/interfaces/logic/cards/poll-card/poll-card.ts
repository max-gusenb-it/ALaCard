import { Card } from "../card";
import { Subject } from "./subject";
import { PollCardSettings } from "./poll-card-settings";

export interface PollCard extends Card {
    subjects: Subject[];
    settings?: PollCardSettings;
}