import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';
import { IRoom } from 'src/app/core/models/interfaces';
import { PopupService } from 'src/app/core/services/popup.service';
import { Room, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';
import { LeaveDialogComponent } from './menu-dialogs/leave-dialog/leave-dialog.component';

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
    private popupService: PopupService
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
        const ref = this.popupService.openDialog(LeaveDialogComponent);
        firstValueFrom(ref.closed)
          .then((data: any) => {
            if (data.leaveRoom) {
              this.store.dispatch(new Room.LeaveRoom());
            }
          }
        );
        break;
    }
  }

}
