import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlayerState } from 'src/app/core/models/enums';
import { RoomService } from 'src/app/core/services/service/room.service';

@Component({
  selector: 'it-player',
  templateUrl: './it-player.component.html',
  styleUrls: ['./it-player.component.scss']
})
export class ItPlayerComponent {

  @ViewChild("player") playerContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild("controls") controlsContainerRef?: ElementRef<HTMLDivElement>;

  @Input() profilePicture: string = "";
  @Input() username: string = "";
  @Input() state: PlayerState = null as any;

  displayControls: boolean = false;

  constructor(
    private translateService: TranslateService,
    private roomService: RoomService
  ) { }

  getStateTranslation(state: PlayerState) {
    switch(state) {
      case(PlayerState.active): 
        return this.translateService.instant("features.room.playerStates.active");
      case(PlayerState.left): 
        return this.translateService.instant("features.room.playerStates.left");
    }
  }

  toggleControls() {
    if (!!!this.controlsContainerRef || !this.roomService.isUserAdmin()) return;

    this.displayControls = !this.displayControls;
    
    if (this.displayControls) {
      this.controlsContainerRef!.nativeElement.style.maxWidth = this.controlsContainerRef!.nativeElement.scrollWidth + "px";
    } else {
      this.controlsContainerRef!.nativeElement.style.maxWidth = "0px";
    }
  }

  onMouseLeave() {
    if (this.displayControls) this.toggleControls();
  }
}
