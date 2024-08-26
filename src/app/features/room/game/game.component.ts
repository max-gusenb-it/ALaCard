import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { IngameData, Room } from 'src/app/core/models/interfaces';
import { ResponseDataSourceService } from 'src/app/core/services/data-source/response-data-source.service';
import { IngameDataService } from 'src/app/core/services/ingame-data.service';
import { AuthenticationState, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent extends AngularLifecycle {

  room: Room;
  ingameData: IngameData;

  @Select(RoomState.deckname) deckname$: Observable<string>;
  @Select(RoomState.room) room$: Observable<Room>;

  constructor(
    private ingameDataService: IngameDataService,
    private responseDataSourceService: ResponseDataSourceService,
    private store: Store
  ) {
    super();

    this.room$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(r => this.room = r);

    this.ingameDataService.getIngameData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(i => this.ingameData = i);
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
