import { Injectable } from "@angular/core";
import { Player, VotingCardTranslationService, VotingResult } from "@features";

@Injectable({
    providedIn: 'root'
})
export class PlayerVotingTranslationService extends VotingCardTranslationService {
    override getResultProfilePicture(result: VotingResult, players: Player[]) : string {
        return players.find(p => p.id === result.subjectID)?.profilePicture ?? "";
    }
}