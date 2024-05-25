import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ItSnackbarComponent } from 'src/app/shared/components/display/it-snackbar/it-snackbar.component';
import { ISnackbarData } from '../models/interfaces/components/display/it-snackbar/ISnackbarData';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: Dialog, public overlay: Overlay) { }

  open(component: ComponentType<unknown>, config?: DialogConfig<unknown, DialogRef<unknown, unknown>, BasePortalOutlet> | undefined) {
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

  openSnackbar(text: string, icon?: string, autoClose: boolean = true) {
    let snackbarData: ISnackbarData = {
      text,
      icon,
      autoClose
    }
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
}
