import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { ItSnackbarComponent, ItOptionBottomSheet, OptionBottomSheetData, SnackbarData } from '@shared';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  constructor(
    private dialog: Dialog,
    public overlay: Overlay,
    private modalCtrl: ModalController
  ) { }

  openBottomSheet(component: ComponentType<unknown>, config?: DialogConfig<unknown, DialogRef<unknown, unknown>, BasePortalOutlet> | undefined) {
    if (config == null) {
      config = {};
    }
    config.positionStrategy = config.positionStrategy ?? this.overlay
      .position()
      .global()
      .bottom()
      .centerHorizontally();
    // Set autofocus to element that does no exist to prevent iOS blue focus border
    config.autoFocus = config.autoFocus ?? "__";
    return this.dialog.open(component, config);
  }

  openOptionBottomSheet(
    title: string,
    optionOne: string,
    optionTwo: string,
    subtitle?: string
  ) {
    return this.openBottomSheet(
      ItOptionBottomSheet,
      {
        data: {
          title: title,
          optionOne: optionOne,
          optionTwo: optionTwo,
          subtitle: subtitle
        } as OptionBottomSheetData
      }
    )
  }

  openSnackbar(text: string, icon?: string, hideIcon: boolean = false, autoClose: boolean = true, autoCloseTime?: number) {
    let snackbarData: SnackbarData = {
      text,
      icon,
      hideIcon,
      autoClose,
      autoCloseTime
    };
    return this.dialog.open(ItSnackbarComponent, {
      data: snackbarData,
      positionStrategy: this.overlay
        .position()
        .global()
        .bottom("1.5rem")
        .centerHorizontally(),
      hasBackdrop: false,
      autoFocus: "__"
    })
  }

  async openModal(options: ModalOptions) {
    const modal = await this.modalCtrl.create(options);
    modal.present();
    return modal;
  }

  dismissModal(data?: any) {
    this.modalCtrl.dismiss(data);
  }
}
