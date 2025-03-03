import { Injectable } from "@angular/core";
import { VotingCardService } from "./voting-card.service";
import { Card, NewSubject, PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardService extends VotingCardService<PollCard> {

    override castCard(card: Card): PollCard {
        let pollCard = super.castCard(card);
        return <PollCard>{
            ...pollCard,
            subjects: pollCard.subjects.map((c, index) => {
                return {
                    ID: index.toString(),
                    ...c
                } as NewSubject
            })
        };
    }

    override getSubjects(card: Card): NewSubject[] {
        const pollCard = this.castCard(card);
        return pollCard.subjects;
    }

}
