import { Card } from "../card";
import { Topic } from "./topic";
import { TopicVotingCardSettings } from "./topic-voting-card-settings";

export interface TopicVotingCard extends Card {
    topics: Topic[];
    settings: TopicVotingCardSettings;
}