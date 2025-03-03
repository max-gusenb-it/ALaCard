import { Injectable } from "@angular/core";
import { VotingCardService } from "./voting-card.service";
import { PollCard } from "@shared";

@Injectable({
    providedIn: 'root'
})
export class PollCardService extends VotingCardService<PollCard, number> {

}
