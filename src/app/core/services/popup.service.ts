import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ItSnackbarComponent } from 'src/app/shared/components/display/it-snackbar/it-snackbar.component';
import { SnackbarData } from '../models/interfaces/components/display/it-snackbar/SnackbarData';
import { ItOptionBottomSheet } from 'src/app/shared/components/forms/it-option-bottom-sheet/it-option-bottom-sheet.component';
import { OptionBottomSheetData } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private dialog: Dialog,
    public overlay: Overlay
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

  openSnackbar(text: string, icon?: string, autoClose: boolean = true) {
    let snackbarData: SnackbarData = {
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
