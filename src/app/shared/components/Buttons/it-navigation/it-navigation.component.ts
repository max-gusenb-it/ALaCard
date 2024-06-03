import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  navigate(url: string) {
    this.navController.navigateBack(url);
  }

}
