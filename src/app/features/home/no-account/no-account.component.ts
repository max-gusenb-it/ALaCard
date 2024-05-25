import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'no-account',
  templateUrl: './no-account.component.html'
})
export class NoAccountComponent {

  constructor(private modalCtrl: ModalController) { }

  async openLoginModal() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent
    });
    modal.present();
  }

}
