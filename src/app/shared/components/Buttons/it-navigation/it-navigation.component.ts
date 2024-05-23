import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RouteConfig } from 'src/app/core/constants/route-config';

@Component({
  selector: 'it-navigation',
  templateUrl: './it-navigation.component.html',
  styleUrls: ['./it-navigation.component.scss'],
})
export class ItNavigationComponent {

  constructor(
    public router: Router,
    private navController: NavController
  ) { }

  displayNavigation() {
    return !!RouteConfig.find(r => r.route === this.router.routerState.snapshot.url && r.navigationVisible);
  }

  navigate(url: string) {
    this.navController.navigateBack(url);
  }

}
