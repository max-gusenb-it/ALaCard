import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ItSignInDialog } from '../it-sign-in-dialog/it-sign-in-dialog.component';
import { ItSignUpDialog } from '../it-sign-up-dialog/it-sign-up-dialog.component';

@Component({
  selector: 'it-authenticate-dialog',
  templateUrl: './it-authenticate-dialog.component.html',
})
export class ItAuthenticateDialog implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  async openSignInModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignInDialog
    });
    modal.present();
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  async openSignUpModal() {
    const modal = await this.modalCtrl.create({
      component: ItSignUpDialog
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
