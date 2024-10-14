import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { Room, StaticRoundData } from 'src/app/core/models/interfaces';
import { RoomState } from 'src/app/core/state';
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
    private staticRoundDataService: StaticRoundDataService
  ) {
    super();

    this.room$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(r => this.room = r);

    this.staticRoundDataService.getStaticRoundData$()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(i => this.staticRoundData = i);
  }
}
