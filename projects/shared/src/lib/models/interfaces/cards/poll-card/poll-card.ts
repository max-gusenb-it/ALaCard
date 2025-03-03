import { VotingCard, PollCardSettings, NewSubject } from "@shared";

export interface PollCard extends VotingCard {
    settings: PollCardSettings;
    subjects: NewSubject[];
}