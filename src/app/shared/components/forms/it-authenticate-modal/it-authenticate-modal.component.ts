import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItSignInModal } from '../it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from '../it-sign-up-modal/it-sign-up-modal.component';

@Component({
  selector: 'it-authenticate-modal',
  templateUrl: './it-authenticate-modal.component.html',
})
export class ItAuthenticateModal implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openSignInModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignInModal
    });
    modal.present();
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignUpModal
    });
    modal.present();
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
