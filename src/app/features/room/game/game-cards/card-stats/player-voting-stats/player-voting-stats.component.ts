import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Card, DynamicRoundData, PlayerVotingResult, Round } from 'src/app/core/models/interfaces';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';
import { PlayerVotingCardService } from 'src/app/core/services/service/card/player-voting-card.service';
import { RoomState } from 'src/app/core/state';

@Component({
  selector: 'player-voting-stats',
  templateUrl: './player-voting-stats.component.html'
})
export class PlayerVotingStatsComponent implements AfterViewInit {
  
  @Input() card: Card;
  @Input() round: Round;
  @Input() dynamicRoundData: DynamicRoundData;

  results: PlayerVotingResult[];

  constructor(
    private staticRoundDataService: StaticRoundDataService,
    private playerVotingService: PlayerVotingCardService,
    private store: Store
  ) { }

  ngAfterViewInit(): void {
    this.results = this.playerVotingService.getResults(this.dynamicRoundData);
    console.log (this.results);
  }

  getCardText() {
    return this.playerVotingService.getCardText(
        this.card,
        this.store.selectSnapshot(RoomState.players),
        this.round.playerIds,
        this.store.selectSnapshot(RoomState.specificPlayerId),
    );
  }

  startNextRound() {
    this.staticRoundDataService.startNewRound();
  }

}
