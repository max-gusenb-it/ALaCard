import { Component } from '@angular/core';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';

@Component({
  selector: 'player-voting-stats',
  templateUrl: './player-voting-stats.component.html'
})
export class PlayerVotingStatsComponent {

  constructor(
    private staticRoundDataService: StaticRoundDataService
  ) { }

  startNextRound() {
    this.staticRoundDataService.startNewRound();
  }

}
