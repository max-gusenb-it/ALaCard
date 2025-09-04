import { Injectable } from "@angular/core";
import { CardUtils, MarkdownUtils, PollCardTranslationService, votingCardSkipValue, VotingResult } from "@features";
import { Card, QuizCard, QuizSubject, Subject, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class QuizCardTranslationService extends PollCardTranslationService {
    override get markdownBreak() {
        return "<br>\n\n";
    }

    castSubjects(subjects: Subject[]) : QuizSubject[] {
        return <QuizSubject[]>subjects;
    }

    protected override getSubjectsText(card: Card, cardState: string): string {
        let text = "<br><br>\n";
        const quizCard = CardUtils.castCard<QuizCard>(card);
        text += "<ul>";
        quizCard.subjects.forEach(subject => {
            let cssClass = "";
            if (!CardUtils.isInitialCardState(cardState)) cssClass = subject.isTarget ? "target-subject" : "none-target-subject"
            text += MarkdownUtils.addTagToContent(subject.title, "li", [cssClass]);
        });
        text += "</ul>";
        return text;
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

    override getResultTitle(result: VotingResult, subjects: Subject[]): string {
        if (result.subjectID === votingCardSkipValue) return this.translateService.instant("shared.components.display.it-result.skipped");
        const quizSubjects = this.castSubjects(subjects);
        return quizSubjects.find(s => s.ID === result.subjectID)!.title;
    }
}