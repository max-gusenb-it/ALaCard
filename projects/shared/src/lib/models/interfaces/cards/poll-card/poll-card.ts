import { VotingCard, Subject } from "@shared";

export interface PollCard extends VotingCard {
    subjects: Subject[];
}