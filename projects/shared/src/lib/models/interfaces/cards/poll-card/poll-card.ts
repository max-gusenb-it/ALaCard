import { VotingCard, NewSubject } from "@shared";

export interface PollCard extends VotingCard {
    subjects: NewSubject[];
}