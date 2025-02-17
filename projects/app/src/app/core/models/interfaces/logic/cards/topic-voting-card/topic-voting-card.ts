import { PollCard } from "../poll-card/poll-card";
import { TopicVotingCardSettings } from "./topic-voting-card-settings";

export interface TopicVotingCard extends PollCard {
    settings?: TopicVotingCardSettings;
}