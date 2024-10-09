import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { Room, StaticRoundData } from 'src/app/core/models/interfaces';
import { ResponseDataSourceService } from 'src/app/core/services/source/response-data.source.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { StaticRoundDataService } from 'src/app/core/services/data/static-round-data.data.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent extends AngularLifecycle {

  room: Room;
  staticRoundData: StaticRoundData;

  @Select(RoomState.deckname) deckname$: Observable<string>;
  @Select(RoomState.room) room$: Observable<Room>;

  constructor(
    private staticRoundDataService: StaticRoundDataService,
    private responseDataSourceService: ResponseDataSourceService,
    private store: Store
  ) {
    super();

    this.room$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(r => this.room = r);

    this.staticRoundDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(i => this.staticRoundData = i);
  }

  onRulesRead() {
    return this.responseDataSourceService.addResponse(
      this.room.id!,
      {
        roundId: -1,
        playerId: this.store.selectSnapshot(AuthenticationState.user)?.id!,
        skipped: false
      }
    );
  }

}
