import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { IOptionDialogData, IPlayer, IRoom } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/popup.service';
import { Room, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { ItOptionDialogComponent } from 'src/app/shared/components/forms/it-option-dialog/it-option-dialog.component';
import { TranslateService } from '@ngx-translate/core';
import { ShareDialogComponent } from './menu-dialogs/share-dialog/share-dialog.component';
import { RoomUtils } from 'src/app/core/utils/room.utils';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html'
})
export class RoomPage extends AngularLifecycle implements OnInit {
  @Select(RoomState.room) room$!: Observable<IRoom>;

  constructor(
    private store: Store,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.destroyed$))
      .subscribe((paramMap) => {
        const joinInfos =  paramMap.get("connectionData")?.split("-");
        if (joinInfos != null && (joinInfos?.length == 1 || joinInfos?.length == 2)) {
          this.store.dispatch(new Room.JoinRoom(joinInfos[0], joinInfos[1]));
        } else {
          this.navCtrl.navigateBack("home");
        }
      });
  }

  handleMenuAction(actionType: string) {
    switch(actionType) {
      case("exit_to_app"):
        const ref = this.popupService.openDialog(
          ItOptionDialogComponent, 
          {
            data: { 
              title: this.translateService.instant("features.room.leave-dialog.title"),
              optionOne: this.translateService.instant("actions.cancel"),
              optionTwo: this.translateService.instant("features.room.leave-dialog.leave-room")
            } as IOptionDialogData 
          }
        );
        firstValueFrom(ref.closed)
          .then((data: any) => {
            if (data) {
              this.store.dispatch(new Room.LeaveRoom());
            }
          }
        );
        break;
      case("share"):
        const room = this.store.selectSnapshot(RoomState.room);
        if (!!room) {
          this.popupService.openDialog(
            ShareDialogComponent,
            {
              data: RoomUtils.generateJoinLink(room)
            }
          );
        }
        break;  
    }
  }

  mapPlayersToArray(players: { [key: string]: IPlayer }) {
    return Object.values(players).sort((p1, p2) => p1.joinOrder - p2.joinOrder);
  }

}
