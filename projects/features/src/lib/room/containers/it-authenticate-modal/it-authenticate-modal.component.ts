import { Component, OnInit } from '@angular/core';
import { ItSignUpModal,PopupService, ItSignInModal } from '@shared';

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
