import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { RoomState, StaticRoundData, Room, StaticRoundDataDataService } from '@features';
import { AngularLifecycle } from '@shared';

@Component({
  selector: 'it-game',
  templateUrl: './it-game.component.html'
})
export class ItGameComponent extends AngularLifecycle {

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
