import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EPlayerState } from 'src/app/core/models/interfaces/logic/room/IPlayer';

@Component({
  selector: 'it-player',
  templateUrl: './it-player.component.html',
  styleUrls: ['./it-player.component.scss']
})
export class ItPlayerComponent {

  @Input() profilePicture: string = "";
  @Input() username: string = "";
  @Input() state: EPlayerState = null as any;

  constructor(
    private translateService: TranslateService 
  ) { }

  getStateTranslation(state: EPlayerState) {
    switch(state) {
      case(EPlayerState.active): 
        return this.translateService.instant("features.room.playerStates.active");
      case(EPlayerState.inactive): 
      return this.translateService.instant("features.room.playerStates.inactive");
      case(EPlayerState.left): 
      return this.translateService.instant("features.room.playerStates.left");
    }
  }

}
