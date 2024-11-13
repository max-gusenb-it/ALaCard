import { Card } from "../card";
import { Topic } from "./topic";
import { PollCardSettings } from "./poll-card-settings";

export interface PollCard extends Card {
    topics: Topic[];
    settings?: PollCardSettings;
}