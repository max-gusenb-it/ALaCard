import { Component, OnInit } from '@angular/core';
import { ItSignInModal } from '../it-sign-in-modal/it-sign-in-modal.component';
import { ItSignUpModal } from '../it-sign-up-modal/it-sign-up-modal.component';
import { PopupService } from 'src/app/core/services/service/popup.service';

@Component({
  selector: 'it-authenticate-modal',
  templateUrl: './it-authenticate-modal.component.html',
})
export class ItAuthenticateModal implements OnInit {

  constructor(private popupService: PopupService) { }

  ngOnInit() {}

  async openSignInModal() {
    const modal = await this.popupService.openModal({
      component: ItSignInModal
    });
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  async openSignUpModal() {
    const modal = await this.popupService.openModal({
      component: ItSignUpModal
    });
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  close() {
    this.popupService.dismissModal();
  }
}
