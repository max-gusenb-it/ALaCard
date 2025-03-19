import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { environment } from 'projects/app/src/environments/environment';
import { AuthenticationState, PopUpService } from '@shared';

const inDevUrls = ['/test', '/store'];

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
    private popUpService: PopUpService,
    private translateService: TranslateService
  ) { }

  navigate(url: string) {
    if (url !== "/home" && !this.store.selectSnapshot(AuthenticationState.isAuthenticated) ) {
      if (environment.production || !environment.production && url !== '/test') {
        this.popUpService.openSnackbar(
          this.translateService.instant("shared.components.buttons.it-navigation.no-account")
        );
        return;
      }
    }
    if (inDevUrls.includes(url)) {
      if (environment.production || !environment.production && url !== '/test') {
        this.popUpService.openSnackbar(
          this.translateService.instant("shared.components.buttons.it-navigation.soon-in-development")
        );
        return;
      }
    }
    if (url === "/room") {
      const userId = this.store.selectSnapshot(AuthenticationState.userId)!;
      const roomId = this.store.selectSnapshot(AuthenticationState.roomId);
      if (!roomId) {
        this.popUpService.openSnackbar(
          this.translateService.instant("shared.components.buttons.it-navigation.no-room-owned")
        );
        return;
      }
      url += `/${userId}-${roomId}`;
    }
    if (url === "/test") {
      if (environment.production) return;
    }
    this.navController.navigateForward(url);
  }

}
