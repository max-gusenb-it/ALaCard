import { Component, OnInit } from '@angular/core';
import { ItSignUpModal, PopUpService, ItSignInModal } from '@shared';

@Component({
  selector: 'it-authenticate-modal',
  templateUrl: './it-authenticate-modal.component.html',
})
export class ItAuthenticateModal implements OnInit {

  constructor(private popUpService: PopUpService) { }

  ngOnInit() {}

  async openSignInModal() {
    const modal = await this.popUpService.openModal({
      component: ItSignInModal
    });
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  async openSignUpModal() {
    const modal = await this.popUpService.openModal({
      component: ItSignUpModal
    });
    const data = await modal.onDidDismiss<boolean>();
    if (data.data) {
      this.close();
    }
  }

  close() {
    this.popUpService.dismissModal();
  }
}
