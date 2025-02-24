import { Card } from "../card";
import { Subject } from "./subject";
import { TopicVotingCardSettings } from "./topic-voting-card-settings";

export interface TopicVotingCard extends Card {
    subjects: Subject[];
    settings?: TopicVotingCardSettings;
}