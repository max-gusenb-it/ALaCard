import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { Room, StaticRoundData } from 'projects/app/src/app/core/models/interfaces';
import { RoomState } from 'projects/app/src/app/core/state';
import { AngularLifecycle } from 'projects/app/src/app/shared/helper/angular-lifecycle.helper';
import { StaticRoundDataDataService } from 'projects/app/src/app/core/services/data/static-round-data.data.service';

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
    private staticRoundDataDataService: StaticRoundDataDataService
  ) {
    super();

    this.room$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(r => this.room = r);

    this.staticRoundDataDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(i => this.staticRoundData = i);
  }
}
