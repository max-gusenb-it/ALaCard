import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { PopupService } from 'src/app/core/services/service/popup.service';
import { AuthenticationState } from 'src/app/core/state';
import { environment } from 'src/environments/environment';

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
    private popupService: PopupService,
    private translateService: TranslateService
  ) { }

  navigate(url: string) {
    if (url !== "/home" && !this.store.selectSnapshot(AuthenticationState.isAuthenticated) ) {
      if (environment.production || !environment.production && url !== '/test') {
        this.popupService.openSnackbar(
          this.translateService.instant("shared.components.buttons.it-navigation.no-account")
        );
        return;
      }
    }
    if (inDevUrls.includes(url)) {
      if (environment.production || !environment.production && url !== '/test') {
        this.popupService.openSnackbar(
          this.translateService.instant("shared.components.buttons.it-navigation.soon-in-development")
        );
        return;
      }
    }
    if (url === "/room") {
      const userId = this.store.selectSnapshot(AuthenticationState.userId)!;
      const roomId = this.store.selectSnapshot(AuthenticationState.roomId);
      if (!roomId) {
        this.popupService.openSnackbar(
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
