import { Injectable } from "@angular/core";
import { PollCardTranslationService, VotingResult } from "@features";
import { QuizSubject, Subject, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class QuizCardTranslationService extends PollCardTranslationService {
    castSubjects(subjects: Subject[]) : QuizSubject[] {
        return <QuizSubject[]>subjects;
    }

    override getResultsHeading(subjects: Subject[], topResults: VotingResult[]): string {
        const quizSubjects = this.castSubjects(subjects);
        return Utils.addComaToStringArray(
            quizSubjects
                .filter(s => s.isTarget)
                .map(s => s.title),
            true
        );
    }

    override getResultTitle(result: VotingResult, resultIndex: number, subjects: Subject[], topResults: VotingResult[]): string {
        const quizSubjects = this.castSubjects(subjects);
        const targetSubjectCount = quizSubjects
            .filter(s => s.isTarget)
            .length;
        if (targetSubjectCount === 1 && resultIndex === 0) return "";
        return quizSubjects.find(s => s.ID === result.subjectID)!.title;
    }
}