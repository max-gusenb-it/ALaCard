import { Injectable } from "@angular/core";
import { CardState, CardUtils, MarkdownUtils, Player, PollCardTranslationService, VotingResult } from "@features";
import { Card, QuizCard, QuizSubject, Subject, Utils } from "@shared";
import { QuizCardGroup } from "projects/shared/src/lib/models/enums/cards/quiz-card/quiz-card-group";

@Injectable({
    providedIn: 'root'
})
export class QuizCardTranslationService extends PollCardTranslationService {
    override get gameSipTextBreaker() {
        return "<br>\n\n";
    }

    override get defaultSipDistributionGroup(): string {
        return QuizCardGroup.QuizCard_AllTargets;
    }

    castSubjects(subjects: Subject[]) : QuizSubject[] {
        return <QuizSubject[]>subjects;
    }

    override getCardTitle(card: Card) {
        if (Utils.isStringDefinedAndNotEmpty(card.settings?.customTitle))
            return card.settings!.customTitle;
        return this.translateService.instant("features.room.game.card.quiz");
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

    override getResultTitle(result: VotingResult, resultIndex: number, subjects: Subject[], topResults: VotingResult[]): string {
        const quizSubjects = this.castSubjects(subjects);
        const targetSubjectCount = quizSubjects
            .filter(s => s.isTarget)
            .length;
        if (targetSubjectCount === 1 && resultIndex === 0) return "";
        return quizSubjects.find(s => s.ID === result.subjectID)!.title;
    }

    override getSipTextForGroup(group: string) {
        switch(group) {
            case(QuizCardGroup.QuizCard_AllTargets):
                return this.translateService.instant("features.room.game.game-cards.offline-sip-display.all_targets");
            case(QuizCardGroup.QuizCard_NotAllTargets):
                return  this.translateService.instant("features.room.game.game-cards.offline-sip-display.not_all_targets")
            default: return super.getSipTextForGroup(group);
        }
    }
}