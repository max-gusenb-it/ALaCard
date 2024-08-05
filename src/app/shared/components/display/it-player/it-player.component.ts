import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlayerState } from 'src/app/core/models/interfaces/logic/room/Player';

@Component({
  selector: 'it-player',
  templateUrl: './it-player.component.html',
  styleUrls: ['./it-player.component.scss']
})
export class ItPlayerComponent {

  @Input() profilePicture: string = "";
  @Input() username: string = "";
  @Input() state: PlayerState = null as any;

  constructor(
    private translateService: TranslateService 
  ) { }

  getStateTranslation(state: PlayerState) {
    switch(state) {
      case(PlayerState.active): 
        return this.translateService.instant("features.room.playerStates.active");
      case(PlayerState.inactive): 
      return this.translateService.instant("features.room.playerStates.inactive");
      case(PlayerState.left): 
      return this.translateService.instant("features.room.playerStates.left");
    }
  }

}
