import { PollCard, QuizSubject } from "@shared";

export interface QuizCard extends PollCard {
    subjects: QuizSubject[];
}