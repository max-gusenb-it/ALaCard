import { Subject } from "@shared";

export interface QuizSubject extends Subject {
    isTarget: boolean;
}