import { Injectable } from "@angular/core";
import { VotingCardService } from "./voting-card.service";
import { Card, Subject, PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardService<C extends PollCard> extends VotingCardService<PollCard> {

    override castCard(card: Card): C {
        let pollCard = super.castCard(card);
        return <C>{
            ...pollCard,
            subjects: pollCard.subjects.map((c, index) => {
                return {
                    ID: index.toString(),
                    ...c
                } as Subject
            })
        };
    }

    override getSubjects(card: Card): Subject[] {
        const pollCard = this.castCard(card);
        return pollCard.subjects;
    }

}
