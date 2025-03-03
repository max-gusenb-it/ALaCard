import { Injectable } from "@angular/core";
import { VotingCardService } from "./voting-card.service";
import { Card, NewSubject, PollCard } from "@shared";
import { topicVotingCardSkipValue } from "@features";

@Injectable({
    providedIn: 'root'
})
export class PollCardService extends VotingCardService<PollCard, number> {

    override get skipValue(): number {
        return topicVotingCardSkipValue;
    }

    override castCard(card: Card): PollCard {
        let pollCard = super.castCard(card);
        return <PollCard>{
            ...pollCard,
            subjects: pollCard.subjects.map((c, index) => {
                return {
                    ID: index,
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
