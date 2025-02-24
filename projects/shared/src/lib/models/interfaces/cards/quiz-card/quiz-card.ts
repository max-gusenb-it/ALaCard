import { PollCard, QuizCardSettings } from "@shared";

export interface QuizCard extends PollCard {
    settings: QuizCardSettings;
}