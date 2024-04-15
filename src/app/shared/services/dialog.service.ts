import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { BasePortalOutlet } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

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
    return this.dialog.open(component, config);
  }
}
