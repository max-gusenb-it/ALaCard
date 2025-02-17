import { Component, ElementRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { PlayerState } from 'projects/app/src/app/core/models/enums';
import { RoomService } from 'projects/app/src/app/core/services/service/room.service';
import { AuthenticationState } from 'projects/app/src/app/core/state';

@Component({
  selector: 'it-player',
  templateUrl: './it-player.component.html',
  styleUrls: ['./it-player.component.scss']
})
export class ItPlayerComponent {

  @ViewChild("player") playerContainerRef?: ElementRef<HTMLDivElement>;
  @ViewChild("controls") controlsContainerRef?: ElementRef<HTMLDivElement>;

  @Input() playerId: string = "";
  @Input() profilePicture: string = "";
  @Input() username: string = "";
  @Input() state: PlayerState = null as any;

  @Output() kickPlayer: EventEmitter<string> = new EventEmitter();

  displayControls: boolean = false;

  constructor(
    private translateService: TranslateService,
    private roomService: RoomService,
    private store: Store
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
    if (!!!this.controlsContainerRef || !this.roomService.isUserAdmin() || this.playerId === this.store.selectSnapshot(AuthenticationState.userId)) return;

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

  kickPlayerClicked() {
    this.kickPlayer.emit(this.playerId);
  }
}
