import { Component, Input } from "@angular/core";
import { Store } from "@ngxs/store";
import { Card, Round } from "src/app/core/models/interfaces";
import { PollCardService } from "src/app/core/services/service/card/poll-card.service";
import { RoomState } from "src/app/core/state";

@Component({
    selector: 'poll-stats',
    templateUrl: './poll-stats.component.html'
})
export class PollStatsComponent {
    @Input() card: Card;
    @Input() round: Round;

    constructor(
        private store: Store,
        private pollCardService: PollCardService
    ) { }

    getCardText() {
      return this.pollCardService.getCardText(
          this.card,
          this.store.selectSnapshot(RoomState.players),
          this.round.playerIds,
          this.store.selectSnapshot(RoomState.specificPlayerId),
      );
    }
}