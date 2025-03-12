import { Injectable } from "@angular/core";
import { CardState, CardUtils, MarkdownUtils, Player, PollCardTranslationService, VotingResult } from "@features";
import { Card, QuizCard, QuizSubject, Subject, Utils } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class QuizCardTranslationService extends PollCardTranslationService {
    castSubjects(subjects: Subject[]) : QuizSubject[] {
        return <QuizSubject[]>subjects;
    }

    override getOfflineCardText(card: Card, players: Player[], playerIds: string[] | undefined, specificPlayerID: string | undefined, isDrinkingGame: boolean, cardState: CardState = CardState.Card_Initial): string {
        let text = this.getCardText(card, players, playerIds, specificPlayerID);
        text += "<br><br>\n";

        const quizCard = CardUtils.castCard<QuizCard>(card);
        text += "<ul>";
        quizCard.subjects.forEach(subject => {
            let cssClass = "";
            if (cardState !== CardState.Card_Initial) cssClass = subject.isTarget ? "target-subject" : "none-target-subject"
            text += MarkdownUtils.addTagToContent(subject.title, "li", [cssClass]);
        });
        text += "</ul>";

        if (isDrinkingGame) {
            text += "<br>\n\n" + this.getCardDrinkingText(card)
        }
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
}