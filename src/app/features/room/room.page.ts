import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, takeUntil } from 'rxjs';
import { IRoom } from 'src/app/core/models/interfaces';
import { Room, RoomState } from 'src/app/core/state';
import { AngularLifecycle } from 'src/app/shared/helper/angular-lifecycle.helper';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html'
})
export class RoomPage extends AngularLifecycle implements OnInit {
  @Select(RoomState.room) room$!: Observable<IRoom>;

  constructor(
    private store: Store,
    private navCtrl: NavController,
    private route: ActivatedRoute
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

}
