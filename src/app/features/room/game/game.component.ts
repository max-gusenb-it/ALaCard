import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RoomState } from 'src/app/core/state';

@Component({
  selector: 'game',
  templateUrl: './game.component.html'
})
export class GameComponent {

  @Select(RoomState.deckname) deckname$!: Observable<string>;

  constructor() { }

}
