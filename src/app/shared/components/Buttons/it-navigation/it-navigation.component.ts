import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AuthenticationState } from 'src/app/core/state';

@Component({
  selector: 'it-navigation',
  templateUrl: './it-navigation.component.html',
  styleUrls: ['./it-navigation.component.scss'],
})
export class ItNavigationComponent {

  constructor(
    public router: Router,
    private navController: NavController,
    private store: Store,
    private dialogService: DialogService,
    private translateService: TranslateService
  ) { }

  navigate(url: string) {
    if (url === "room") {
      const roomId = this.store.selectSnapshot(AuthenticationState.roomId);
      if (!!!roomId) {
        this.dialogService.openSnackbar(
          this.translateService.instant("shared.components.navigation.no-room-owned")
        );
        return;
      }
      url += `/${roomId}`;
    }
    this.navController.navigateForward(url);
  }

}
